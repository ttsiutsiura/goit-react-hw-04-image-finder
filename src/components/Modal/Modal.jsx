import { Image } from './Modal.styled';
import { Overlay } from './Modal.styled';
import { ModalEl } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>
        <Image src={image} alt="" />
      </ModalEl>
    </Overlay>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};