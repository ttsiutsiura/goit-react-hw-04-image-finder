import { GalleryItem } from './ImageGalleryItem.styled';
import { Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ largeImage, image, onImageClick }) {
  return (
    <GalleryItem
      onClick={() => {
        onImageClick(largeImage);
      }}
    >
      <Image src={image} alt="xxx" />
    </GalleryItem>
  );
}
