import { GalleryItem } from './ImageGalleryItem.styled';
import { Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ largeImage, image, tags, onImageClick }) {
  return (
    <GalleryItem
      onClick={() => {
        onImageClick(largeImage);
      }}
    >
      <Image src={image} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
