import { SpinnerContainer } from 'components/Loader/Loader.styled';
import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export function Loader({ isLoading }) {
  return (
    <SpinnerContainer isHidden={!isLoading}>
      <RotatingLines
        strokeColor="orange"
        strokeWidth="5"
        animationDuration="0.75"
        width="36"
        visible={isLoading}
      />
    </SpinnerContainer>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
};
