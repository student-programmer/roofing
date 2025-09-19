import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import c from './Form.module.css';
import { useState, useRef } from 'react';
import Modal from '../Modal/Modal';

export const MainForm = () => {
	const [error, setError] = useState(false);
	const [modal, setModal] = useState(false);
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const ref = useRef();

	const toggleModal = currentStatus => {
		setModal(!currentStatus);
	};
	if (modal) {
		document.body.classList.add('activeModal');
	} else {
		document.body.classList.remove('activeModal');
	}

	const Submit = data => {
		const phone = data.phone;
		const name = data.name;
		fetch('/api/telegram', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, phone }),
		})
			.then(response => response.json())
			.then(() => {
				toggleModal(modal);
				setTimeout(() => toggleModal(!modal), 10000);
				ym(104219428,'reachGoal','submit')
			});

		reset();
		setValue('phone', '');
	};

	return (
		<div className={c.cont} id='application'>
			<form onSubmit={handleSubmit(Submit)} className={c.form}>
				<h1 className={c.zag}> Закажите звонок</h1>
				<p className={c.parag}>
					Оставьте контакты, по которым мы можем с вами связаться, наши
					специалисты помогут вам с решением вашего вопроса.
				</p>
				<div className={c.inputs}>
					<div className={c.label}>
						<input
							type='text'
							className={c.name}
							name='name'
							id='name'
							placeholder='   Ваше имя'
							autoComplete='name'
							{...register('name', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^[A-Za-zА-Яа-яЁё\s]+$/,
									message: 'Поле должно содержать только буквы',
								},
							})}
						/>
					</div>
					{errors?.name && (
						<p className={c.name_errors}>{errors?.name?.message || 'Error'}</p>
					)}
					<div className={c.label}>
						<InputMask
							ref={ref}
							mask='+7 999 999 99 99'
							className={c.name}
							type='tel'
							name='phone'
							id='phone'
							placeholder='   Номер телефона'
							autoComplete='phone'
							alwaysShowMask={false}
							{...register('phone', {
								required: 'Поле обязательно к заполнению',
								valueAsNumber: false,
								minLength: {
									value: 10,
									message: 'Должно быть не менее 10 цифр',
								},
							})}
						/>
					</div>
					{errors?.phone && (
						<p className={c.phone_errors}>
							{errors?.phone?.message || 'Error'}
						</p>
					)}
				</div>
				<button className={c.btn}>Оставить заявку</button>
				<p className={c.agreement}>
					Нажимая на кнопку, вы даёте согласие на обработку персональных данных
					и&nbsp;
					<a href='/docs/privacy.pdf' target='_blank' rel='noopener noreferrer'>
						принимаете политику конфиденциальности
					</a>
					.
				</p>
				{modal && <Modal toggleModal={toggleModal} />}
			</form>
		</div>
	);
};
