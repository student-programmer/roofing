
import modal from './Modal.module.css';
const Modal = ({toggleModal}) => {
  return (
		<div onClick={toggleModal} className={modal.wrapper}>
			<div
				onClick={event => event.stopPropagation()}
				className={modal.modalContent}
			>
				<div className={modal.content}>
					<h1 className={modal.thanks}>
						Заявка успешно отправлена! <br/>Ожидайте звонка.
					</h1>
					<button onClick={toggleModal} className={modal.close}>
						<i className='fas fa-times'></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal