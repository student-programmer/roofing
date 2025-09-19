// module.exports.sendMsg = (req, res) => {
//     //токен и id чата берутся из config.json
//     const config = require('../config/config.json');

//     let http = require('request');
//     let reqBody = req.body;
//     //каждый элемент обьекта запихиваем в массив
//     let fields = [
// 			'<b>Имя</b>: ' + reqBody.name,
// 			// '<b>Email</b>: ' + reqBody.email,
// 			'<b>Номер телефона</b>: ' + reqBody.phone,
// 			'<b>Заявка по крышам</b>',
// 		];
//     let msg = '';
//     //проходимся по массиву и склеиваем все в одну строку
//     fields.forEach((field) => {
//         msg += field + '\n';
//     });
//     //кодируем результат в текст, понятный адресной строке
//     msg = encodeURI(msg);
//     //делаем запрос
//     http.post(
//         `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
//         function (error, response, body) {
//             //не забываем обработать ответ
//             console.log('error:', error);
//             console.log('statusCode:', response && response.statusCode);
//             console.log('body:', body);
//             if (response.statusCode === 200) {
//                 res.status(200).json({
//                     status: 'ok',
//                     message: 'Заявка успешно отправлена! Ожидайте звонка.',
//                 });
//             }
//             if (response.statusCode !== 200) {
//                 res.status(400).json({
//                     status: 'error',
//                     message: 'Произошла ошибка!',
//                 });
//             }
//         }
//     );
// };
module.exports.sendMsg = async (req, res) => {
	const config = require('../config/config.json');
	const https = require('https');

	let reqBody = req.body;
	let fields = [
		'<b>Имя</b>: ' + reqBody.name,
		'<b>Номер телефона</b>: ' + reqBody.phone,
	];
	let msg = fields.join('\n');

	// Преобразуем в массив, если у нас строка (для обратной совместимости)
	const chatIds = Array.isArray(config.telegram.chat)
		? config.telegram.chat
		: [config.telegram.chat];

	let successCount = 0;
	let errorCount = 0;

	// Функция для отправки в один чат
	const sendToChat = chatId => {
		return new Promise(resolve => {
			const postData = JSON.stringify({
				chat_id: chatId,
				parse_mode: 'HTML',
				text: msg,
			});

			const options = {
				hostname: 'api.telegram.org',
				path: `/bot${config.telegram.token}/sendMessage`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': Buffer.byteLength(postData),
				},
			};

			const request = https.request(options, response => {
				let data = '';
				response.on('data', chunk => {
					data += chunk;
				});
				response.on('end', () => {
					if (response.statusCode === 200) {
						successCount++;
					} else {
						errorCount++;
						console.error(`Error sending to ${chatId}:`, data);
					}
					resolve();
				});
			});

			request.on('error', e => {
				console.error('Request error:', e);
				errorCount++;
				resolve();
			});

			request.write(postData);
			request.end();
		});
	};

	// Отправляем всем последовательно
	for (const chatId of chatIds) {
		await sendToChat(chatId);
	}

	// Отвечаем клиенту
	if (errorCount === 0) {
		res.status(200).json({
			status: 'ok',
			message: `Заявка отправлена ${successCount} получателям!`,
		});
	} else {
		res.status(207).json({
			// 207 Multi-Status
			status: 'partial',
			message:
				`Заявка отправлена ${successCount} получателям, ` +
				`не удалось отправить ${errorCount}.`,
		});
	}
};
