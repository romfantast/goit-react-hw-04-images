import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ formSubmitHandler }) => {
  const [value, setValue] = useState('');

  const handlerInputValue = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handlerSubmitForm = e => {
    e.preventDefault();
    formSubmitHandler(value.trim());
    setValue('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handlerSubmitForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={value}
          onChange={handlerInputValue}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};

export default Searchbar;
