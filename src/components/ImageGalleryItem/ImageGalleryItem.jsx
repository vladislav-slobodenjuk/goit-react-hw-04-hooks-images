import { useContext } from 'react';
import { GlobalContext } from 'context/GlobalContext';

// import propTypes from 'prop-types';

import s from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem(props) {
  const { webformatURL, largeImageURL, user, id } = props;
  const { toggleModal } = useContext(GlobalContext);

  const alt = `${user}'s photo №${id}`;

  return (
    <li className={s.galleryItem}>
      <img
        className={s.galleryImage}
        src={webformatURL}
        alt={alt}
        onClick={() => toggleModal(largeImageURL, alt)}
      />
    </li>
  );
}
