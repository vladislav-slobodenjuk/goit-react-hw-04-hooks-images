import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import axiosFetch from 'services/pixabayAPI';
import { toast } from 'react-toastify';

import ImageGalleryIdleView from './statuses/ImageGalleryIdleView';
import ImageGalleryPendingView from './statuses/ImageGalleryPendingView';
import ImageGalleryErrorView from './statuses/ImageGalleryErrorView';
import ImageGalleryDataView from './statuses/ImageGalleryDataView';
import Button from 'components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export default function ImageGallery(props) {
  const { searchString, page, setPage } = props;

  const [imageArray, setImageArray] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const incrPage = () => {
    // setPage(prev => prev + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    if (searchString === '') {
      // stop effect at mount
      return;
    }

    if (searchString.length < 3) {
      toast.warn('Запрос слишком короткий');
      return;
    }

    setStatus('pending');

    (async () => {
      try {
        const fetchResult = await axiosFetch(searchString, page);

        if (fetchResult.length === 0 && page !== 1) {
          // если пустой результат на последней странице
          toast.warn('Больше ничего нет, это все :(');
          setStatus('resolved');
          return;
        }

        if (fetchResult.length === 0) {
          toast.warn('Ничего не нашли :(');
          setImageArray([]);
          throw new Error(`По запросу ${searchString} ничего нет`);
        }

        if (page === 1) {
          setImageArray([...fetchResult]);
          setStatus('resolved');
          toast.success('Ура, нашли!');
          return;
        }

        setImageArray(prev => [...prev, ...fetchResult]);
        setStatus('resolved');
        toast.success('Ура, нашли еще!');
        //
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    })();
  }, [searchString, page]);

  return (
    <>
      {status === 'idle' && <ImageGalleryIdleView />}
      {status === 'pending' && <ImageGalleryPendingView />}
      {status === 'rejected' && (
        <ImageGalleryErrorView message={error.message} />
      )}
      {(status === 'resolved' || status === 'pending') && (
        <>
          <ImageGalleryDataView imageArray={imageArray} />
          <Button pageDown={incrPage} />;
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchString: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
  setPage: propTypes.func.isRequired,
};
