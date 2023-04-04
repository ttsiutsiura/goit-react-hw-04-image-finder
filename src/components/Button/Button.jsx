import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ areImages, areLastImages, onClick }) {
  if (areImages && !areLastImages) {
    return (
      <LoadMoreButton type="button" onClick={onClick}>
        Load more
      </LoadMoreButton>
    );
  }
}

Button.propTypes = {
  areImages: PropTypes.bool.isRequired,
  areLastImages: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
