import React, { Component } from 'react';
// import propTypes from 'prop-types';
import axiosFetch from 'services/pixabayAPI';
import { toast } from 'react-toastify';

import ImageGalleryIdleView from './statuses/ImageGalleryIdleView';
import ImageGalleryPendingView from './statuses/ImageGalleryPendingView';
import ImageGalleryErrorView from './statuses/ImageGalleryErrorView';
import ImageGalleryDataView from './statuses/ImageGalleryDataView';
import Button from 'components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
  state = {
    imageArray: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const fetchResult = await axiosFetch(nextSearch, nextPage);

        if (fetchResult.length === 0) {
          throw (
            (new Error(`По запросу ${nextSearch} ничего нет`),
            toast.warn('Ничего не нашли :('))
          );
        }

        this.setState({
          imageArray: [...fetchResult],
          status: 'resolved',
        });
        toast.success('Ура, нашли!');
      } catch (error) {
        console.log(error);
        this.setState({ error, status: 'rejected' });
      }

      //   axiosFetch(nextSearch, nextPage)
      //     .then(result => {
      //       if (result.length === 0) {
      //         return Promise.reject(
      //           new Error(`По запросу ${nextSearch} ничего нет`),
      //           toast.warn('Ничего не нашли :('),
      //         );
      //       }

      //   this.setState({
      //     imageArray: [...result],
      //     status: 'resolved',
      //   });
      //   toast.success('Ура, нашли!');
      // })
      //     .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      axiosFetch(nextSearch, nextPage)
        .then(result => {
          if (result.length === 0) {
            return Promise.reject(
              new Error(`По запросу ${nextSearch} ничего нет`),
              toast.warn('Ничего не нашли :('),
            );
          }

          this.setState(prevState => ({
            imageArray: [...prevState.imageArray, ...result],
            status: 'resolved',
          }));
          toast.success('Ура, еще нашли!');
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imageArray, error, status } = this.state;

    return (
      <>
        {status === 'idle' && <ImageGalleryIdleView />}
        {status === 'pending' && <ImageGalleryPendingView />}
        {status === 'rejected' && (
          <ImageGalleryErrorView message={error.message} />
        )}
        {status === 'resolved' && (
          <>
            <ImageGalleryDataView
              imageArray={imageArray}
              toggleModal={this.props.toggleModal}
            />
            <Button pageDown={this.incrPage} />;
          </>
        )}
      </>
    );
  }
}
