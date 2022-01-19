import propTypes from 'prop-types';
import errorImage from 'images/error.jpg';

export default function ImageGalleryErrorView({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
      }}
    >
      <p>{message}</p>
      <img src={errorImage} alt="sadCat" width="240" />
    </div>
  );
}

ImageGalleryErrorView.propTypes = {
  message: propTypes.string.isRequired,
};
