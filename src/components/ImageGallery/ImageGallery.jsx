// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
// import propTypes from 'prop-types';

import axiosFetch from 'services/pixabayAPI';
import { toast } from 'react-toastify';
// import scrollIntoView from 'scroll-into-view-if-needed';

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
  // const { page, setPage } = useContext(GlobalContext);

  // const [page, setPage] = useState(1);

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
          //
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
        // console.log(error);
        setError(error);
        setStatus('rejected');
      }
    })();
  }, [searchString, page]);

  // useEffect(() => {
  //   return;
  //   if (searchString === '' || page === 1) {
  //     // stop effect at mount
  //     return;
  //   }

  //   setStatus('pending');

  //   (async () => {
  //     try {
  //       const fetchResult = await axiosFetch(searchString, page);

  //       if (fetchResult.length === 0 && page !== 1) {
  //         toast.warn('Больше ничего нет, это все :(');
  //         setStatus('resolved');
  //         return;
  //       }

  //       // this.setState(prevState => ({
  //       //   imageArray: [...prevState.imageArray, ...result],
  //       //   status: 'resolved',
  //       // }));
  //       // toast.success('Ура, еще нашли!');
  //       setImageArray(prev => [...prev, ...fetchResult]);
  //       setStatus('resolved');

  //       toast.success('Ура, нашли еще!');
  //       //
  //     } catch (error) {
  //       console.log(error);
  //       // this.setState({ error, status: 'rejected' });
  //       setError(error);
  //       setStatus('rejected');
  //     }
  //   })();
  // }, [page]);

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

// class oldImageGallery extends Component {
//   state = {
//     imageArray: [],
//     error: null,
//     status: 'idle',
//     page: 1,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevProps.searchString;
//     const nextSearch = this.props.searchString;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevSearch !== nextSearch) {
//       this.setState({ status: 'pending', page: 1 });

//       try {
//         const fetchResult = await axiosFetch(nextSearch, nextPage);

//         if (fetchResult.length === 0) {
//           throw (
//             (new Error(`По запросу ${nextSearch} ничего нет`),
//             toast.warn('Ничего не нашли :('))
//           );
//         }

//         this.setState({
//           imageArray: [...fetchResult],
//           status: 'resolved',
//         });
//         toast.success('Ура, нашли!');
//       } catch (error) {
//         console.log(error);
//         this.setState({ error, status: 'rejected' });
//       }

//       //   axiosFetch(nextSearch, nextPage)
//       //     .then(result => {
//       //       if (result.length === 0) {
//       //         return Promise.reject(
//       //           new Error(`По запросу ${nextSearch} ничего нет`),
//       //           toast.warn('Ничего не нашли :('),
//       //         );
//       //       }

//       //   this.setState({
//       //     imageArray: [...result],
//       //     status: 'resolved',
//       //   });
//       //   toast.success('Ура, нашли!');
//       // })
//       //     .catch(error => this.setState({ error, status: 'rejected' }));
//     }

//     if (prevPage !== nextPage) {
//       this.setState({ status: 'pending' });

//       axiosFetch(nextSearch, nextPage)
//         .then(result => {
//           if (result.length === 0) {
//             return Promise.reject(
//               new Error(`По запросу ${nextSearch} ничего нет`),
//               toast.warn('Ничего не нашли :('),
//             );
//           }

//           this.setState(prevState => ({
//             imageArray: [...prevState.imageArray, ...result],
//             status: 'resolved',
//           }));
//           toast.success('Ура, еще нашли!');
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   incrPage = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { imageArray, error, status } = this.state;

//     return (
//       <>
//         {status === 'idle' && <ImageGalleryIdleView />}
//         {status === 'pending' && <ImageGalleryPendingView />}
//         {status === 'rejected' && (
//           <ImageGalleryErrorView message={error.message} />
//         )}
//         {status === 'resolved' && (
//           <>
//             <ImageGalleryDataView
//               imageArray={imageArray}
//               toggleModal={this.props.toggleModal}
//             />
//             <Button pageDown={this.incrPage} />;
//           </>
//         )}
//       </>
//     );
//   }
// }
