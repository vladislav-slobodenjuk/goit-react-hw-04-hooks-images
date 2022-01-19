import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useContext } from 'react';
import { GlobalContext } from 'context/GlobalContext';
// import propTypes from 'prop-types';

import s from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export default function Modal() {
  const { toggleModal, modalImage, modalAlt } = useContext(GlobalContext);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={modalImage} alt={modalAlt} />
      </div>
    </div>,
    modalRoot,
  );
}
