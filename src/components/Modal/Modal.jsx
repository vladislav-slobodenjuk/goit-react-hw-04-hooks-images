// import React, { Component } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from 'context/GlobalContext';

import { createPortal } from 'react-dom';

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
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={modalImage} alt={modalAlt} />
      </div>
    </div>,
    modalRoot,
  );
}

// class oldModal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { src, alt } = this.props;
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
