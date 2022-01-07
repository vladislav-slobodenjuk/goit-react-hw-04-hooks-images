// import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import s from './../ImageGallery.module.scss';

export default function ImageGalleryDataView({ imageArray }) {
  return (
    <ul className={s.gallery}>
      {imageArray.map(image => {
        const { id, webformatURL, largeImageURL, user } = image;

        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            id={id}
            user={user}
          />
        );
      })}
    </ul>
  );
}
