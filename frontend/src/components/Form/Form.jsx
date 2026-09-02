import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useState, useRef } from 'react';
import Modal from '../Modal/Modal';

export const MainForm = () => {
	const [sending, setSending] = useState(false);
	const [sendError, setSendError] = useState('');
	const [modal, setModal] = useState(false);

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const ref = useRef();

	const toggleModal = () => setModal(v => !v);

	if (modal) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
	}

	const Submit = async data => {
		setSending(true);
		setSendError('');
		try {
			const res = await fetch('/api/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: data.name, phone: data.phone }),
			});
			await res.json();
			setModal(true);
			setTimeout(() => setModal(false), 10000);
			if (typeof ym !== 'undefined') ym(104219428, 'reachGoal', 'submit');
			reset();
			setValue('phone', '');
		} catch {
			setSendError('Не удалось отправить заявку. Позвоните нам напрямую.');
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="kx-form-card">
			<div className="kx-form-top-bar"></div>
			<form onSubmit={handleSubmit(Submit)} className="kx-form-body" noValidate>

				<div className="kx-field">
					<label htmlFor="kx-name" className="kx-label">Как вас зовут</label>
					<input
						id="kx-name"
						type="text"
						autoComplete="name"
						placeholder="Например, Сергей"
						className={`kx-input ${errors.name ? 'kx-input--error' : ''}`}
						{...register('name', {
							required: 'Введите ваше имя',
							pattern: {
								value: /^[A-Za-zА-Яа-яЁёҮүҢңҒғ\s]+$/,
								message: 'Только буквы',
							},
						})}
					/>
					{errors.name && <span className="kx-error">{errors.name.message}</span>}
				</div>

				<div className="kx-field">
					<label htmlFor="kx-phone" className="kx-label">Номер телефона</label>
					<InputMask
						ref={ref}
						mask="+7 999 999 99 99"
						id="kx-phone"
						type="tel"
						autoComplete="tel"
						placeholder="+7 978 000 00 00"
						className={`kx-input kx-input--mono ${errors.phone ? 'kx-input--error' : ''}`}
						{...register('phone', {
							required: 'Введите номер телефона',
							minLength: { value: 16, message: 'Введите полный номер' },
						})}
					/>
					{errors.phone && <span className="kx-error">{errors.phone.message}</span>}
				</div>

				<button type="submit" className="kx-submit" disabled={sending}>
					{sending ? 'Отправляем…' : 'Оставить заявку'}
				</button>

				{sendError && (
					<div className="kx-send-error">{sendError}</div>
				)}

				<p className="kx-agreement">
					Нажимая на кнопку, вы даёте согласие на обработку персональных данных
					и&nbsp;<a href="/docs/privacy.pdf" target="_blank" rel="noopener">политику конфиденциальности</a>.
				</p>
			</form>

			{modal && <Modal toggleModal={toggleModal} />}
		</div>
	);
};
