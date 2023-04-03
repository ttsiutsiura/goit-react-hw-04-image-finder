import { GalleryItem } from './ImageGalleryItem.styled';
import { Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ id, image }) {
  return (
    <GalleryItem>
      <Image src={image} alt="xxx" />
    </GalleryItem>
  );
}
