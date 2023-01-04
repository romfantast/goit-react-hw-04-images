import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { axiosGetImage } from 'pixabay-api/pixabay-api';
import css from './App.module.css';
import Loader from './Loader/Loader';

const FETCH_STATUS = {
  Idle: 'idle',
  Pending: 'pending',
  Resolved: 'resolved',
  Rejected: 'rejected',
};

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.Idle);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus(FETCH_STATUS.Pending);
    (async () => {
      try {
        const { data } = await axiosGetImage(query, page);
        if (!data.total) {
          setStatus(FETCH_STATUS.Rejected);
          return Notify.info('There are no images with this search string');
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setStatus(FETCH_STATUS.Resolved);
        setTotalPages(Math.ceil(data.totalHits / 15));
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [page, query]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const formSubmitHandler = async value => {
    if (!value) {
      return Notify.warning("The search string can't be an empty");
    }
    if (value === query)
      return Notify.info('There are your last search results');
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar formSubmitHandler={formSubmitHandler} />
      {(status === FETCH_STATUS.Resolved || page > 1) && (
        <>
          <ImageGallery imagesList={images} />
        </>
      )}

      {status === FETCH_STATUS.Rejected && (
        <p className={css.error}>
          Something went wrong...Check the info above and try again :/
        </p>
      )}

      {status === FETCH_STATUS.Pending && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}

      {status === FETCH_STATUS.Resolved &&
        page !== totalPages &&
        images.length !== 0 && (
          <div className={css.btnLoadMoreWrapper}>
            <Button onLoadMore={handleLoadMore}>Load More</Button>
            <div ref={bottomRef} />
          </div>
        )}
    </>
  );
};

export default App;
