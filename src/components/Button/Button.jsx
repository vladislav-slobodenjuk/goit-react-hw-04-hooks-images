import propTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button({ pageDown }) {
  return (
    <button
      className={s.button}
      type="button"
      id="AddButton"
      onClick={pageDown}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  pageDown: propTypes.func.isRequired,
};
