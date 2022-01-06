// import React, { PureComponent } from 'react';
import { useState } from 'react';
// import { useContext } from 'react';
// import { GlobalContext } from 'context/GlobalContext';

// import propTypes from 'prop-types';

import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar(props) {
  const { onSubmit } = props;
  const [searchInput, setSearchInput] = useState('');

  // const { handleFormSubmit } = useContext(GlobalContext);

  const handleInputChange = e => {
    // this.setState({ searchInput: e.currentTarget.value.toLowerCase() });
    setSearchInput(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInput.trim() === '') {
      //!!! trim
      // alert('zero string');
      toast.error('Введите что будем искать');
      return;
    }

    // this.props.onSubmit(this.state.searchInput.trim()); // !!! trim
    onSubmit(searchInput.trim()); // !!! trim
    // this.setState({ searchInput: '' });
    setSearchInput('');
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchFormButton}>
          {/* <span className={s.searchFormButtonLabel}>Search</span> */}
          <ImSearch />
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={searchInput} // !!!
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

// class oldSearchbar extends PureComponent {
//   state = {
//     searchString: '',
//   };

//   handleInputChange = e => {
//     this.setState({ searchString: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchString.trim() === '') {
//       //!!! trim
//       // alert('zero string');
//       toast.error('Введите что будем искать');
//       return;
//     }

//     this.props.onSubmit(this.state.searchString.trim()); // !!! trim
//     this.setState({ searchString: '' });
//   };

//   render() {
//     return (
//       <header className={s.searchBar}>
//         <form className={s.searchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.searchFormButton}>
//             {/* <span className={s.searchFormButtonLabel}>Search</span> */}
//             <ImSearch />
//           </button>

//           <input
//             className={s.searchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="search"
//             value={this.state.searchString} // !!!
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
