import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Header } from './App.styled';
import { useState } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export function App() {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleSumbit = query => {
    setQuery(query);
  };

  const toggleModal = id => {
    setShowModal(state => {
      return !state;
    });

    setCurrentImage(id);
  };

  return (
    <>
      <Header>
        <Searchbar onSubmit={handleSumbit} />
      </Header>
      <main>
        <ImageGallery query={query} onImageClick={toggleModal} />
      </main>
      <ToastContainer autoClose={2000} />
      {showModal && <Modal onClose={toggleModal} image={currentImage} />}
    </>
  );
}

App.propTypes = {
  query: PropTypes.string,
  id: PropTypes.number,
};
