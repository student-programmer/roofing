const express = require('express');
const PORT = 5000;
const cors = require('cors');
const index = require('./routes/index');
const app = express();
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const config = require('./config/config.json');

app.use(cors());
app.use(express.json());
app.use('/', index);

app.use(
	session({
		secret: config.telegram.secretKey, // Используйте секретный ключ из переменных окружения
		resave: false,
		saveUninitialized: true,
		cookie: {
			sameSite: 'Strict', // или 'Lax', или 'None'
			secure: true, // Используйте secure: true для https
		},
	})
);

const options = {
	key: fs.readFileSync('./config/ssl/private.key'),
	cert: fs.readFileSync('./config/ssl/certificate.crt'),
};

https.createServer(options, app).listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

