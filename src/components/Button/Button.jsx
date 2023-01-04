import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ children, onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={css.Button} type="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
