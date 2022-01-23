import { useState } from 'react';
import propTypes from 'prop-types';

import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = ({ currentTarget: { value } }) => {
    setSearchInput(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isEmptyString = searchInput.trim() === '';

    if (isEmptyString) {
      toast.error('Введите что будем искать');
      return;
    }

    onSubmit(searchInput.trim());
    setSearchInput('');
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <ImSearch />
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
