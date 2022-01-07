// import { Component } from 'react';
import { useState } from 'react';
import { GlobalContext } from 'context/GlobalContext';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';

import s from './App.module.scss';

export default function App() {
  const [searchString, setSearchString] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleFormSubmit = data => {
    setSearchString(data);
  };

  const toggleModal = (largeImageURL, alt) => {
    setShowModal(!showModal);
    setModalImage(largeImageURL);
    setModalAlt(alt);
  };

  return (
    <GlobalContext.Provider value={{ modalImage, modalAlt, toggleModal }}>
      <div className={s.app}>
        {showModal && (
          <Modal src={modalImage} alt={modalAlt} onClose={toggleModal} />
          // можно убрать пропы
        )}
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery searchString={searchString} />
        <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
      </div>
    </GlobalContext.Provider>
  );
}

// class oldApp extends Component {
//   state = {
//     searchString: '',
//     showModal: false,
//     modalImage: '',
//     modalAlt: '',
//   };

//   handleFormSubmit = data => {
//     this.setState({ searchString: data });
//   };

//   toggleModal = (largeImageURL, alt) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       modalImage: largeImageURL,
//       modalAlt: alt,
//     }));
//   };

//   render() {
//     const { searchString, showModal, modalImage, modalAlt } = this.state;

//     return (
//       <div className={s.app}>
//         {showModal && (
//           <Modal src={modalImage} alt={modalAlt} onClose={this.toggleModal} />
//         )}
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery
//           searchString={searchString}
//           toggleModal={this.toggleModal}
//         />
//         <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
//       </div>
//     );
//   }
// }

// export default App;
