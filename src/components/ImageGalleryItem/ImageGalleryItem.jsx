import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webFormat, largeImageURL }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal(isOpenModal => !isOpenModal);
  };
  return (
    <>
      <li className={css.ImageGalleryItem} onClick={handleToggleModal}>
        <img className={css.ImageGalleryItemImage} src={webFormat} alt="" />
      </li>
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          onToggleModal={handleToggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webFormat: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
