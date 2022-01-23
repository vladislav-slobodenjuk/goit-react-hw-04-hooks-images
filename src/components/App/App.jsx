import { useState } from 'react';
import { AppContext } from 'context/AppContext';

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
  const [page, setPage] = useState(1);

  const handleFormSubmit = data => {
    setSearchString(data);
    setPage(1);
  };

  const toggleModal = (largeImageURL, alt) => {
    setShowModal(!showModal);
    setModalImage(largeImageURL);
    setModalAlt(alt);
  };

  const contextValues = { modalImage, modalAlt, toggleModal };

  return (
    <AppContext.Provider value={contextValues}>
      <div className={s.app}>
        {showModal && (
          <Modal
          // пропсы приходят из контекста
          />
        )}
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          searchString={searchString}
          page={page}
          setPage={setPage}
        />
        <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
      </div>
    </AppContext.Provider>
  );
}
