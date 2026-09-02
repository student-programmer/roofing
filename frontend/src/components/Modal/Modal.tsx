
const Modal = ({ toggleModal }: { toggleModal: () => void }) => {
  return (
    <div
      onClick={toggleModal}
      style={{
        position: 'fixed', inset: 0, zIndex: 70,
        background: 'rgba(6,28,54,.55)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 18px 48px rgba(6,28,54,.14)',
          maxWidth: '440px',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Полоска сверху */}
        <div style={{ height: '3px', background: 'linear-gradient(135deg,#FFDD84 0%,#FEB813 55%,#E8A200 100%)' }} />

        <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
          {/* Иконка */}
          <span style={{
            width: '56px', height: '56px', borderRadius: '999px',
            background: '#E1F5EE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1BA97A',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </span>

          <h3 style={{ font: '700 24px/1.2 "Montserrat","Segoe UI",sans-serif', color: '#061C36', margin: 0 }}>
            Заявка принята
          </h3>

          <p style={{ font: '400 16px/1.6 "Manrope","Segoe UI",sans-serif', color: '#5B6B80', margin: 0 }}>
            Спасибо! Перезвоним в течение 15 минут в рабочее время.{' '}
            Если срочно — звоните сами:{' '}
            <a href="tel:+79780241345" style={{ whiteSpace: 'nowrap', color: '#C98700' }}>
              +7 (978) 024-13-45
            </a>
          </p>

          <button
            onClick={toggleModal}
            style={{
              all: 'unset',
              cursor: 'pointer',
              marginTop: '4px',
              height: '44px',
              padding: '0 24px',
              borderRadius: '8px',
              background: '#0B273F',
              color: '#fff',
              font: '700 14px/1 "Manrope","Segoe UI",sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } as React.CSSProperties}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
