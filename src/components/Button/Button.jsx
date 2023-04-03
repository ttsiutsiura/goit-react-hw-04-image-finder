import { LoadMoreButton } from './Button.styled';

export function Button({ areImages, areLastImages, onClick }) {
  if (areImages && !areLastImages) {
    return (
      <LoadMoreButton type="button" onClick={onClick}>
        Load more
      </LoadMoreButton>
    );
  }
}
