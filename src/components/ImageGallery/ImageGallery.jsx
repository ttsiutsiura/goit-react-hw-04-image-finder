import imagesAPI from 'services/ImagesApi';
import { toast } from 'react-toastify';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export function ImageGallery({ query, onImageClick }) {
  const [page, setPage] = useState(2);
  const [images, setImages] = useState([]);
  const [areLastImages, setAreLastImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setAreLastImages(false);
    setIsLoading(true);

    setTimeout(() => {
      imagesAPI.fetchImages(query, 1).then(data => {
        setPage(2);
        setImages(data.hits);
        setIsLoading(false);

        window.scroll({
          top: 0,
          behavior: 'smooth',
        });

        if (data.totalHits <= 12) {
          setAreLastImages(true);
        }

        if (data.totalHits > 0) {
          toast.info(`Hooray! We found ${data.totalHits} images.`);
        }

        if (data.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      });
    }, 1000);
  }, [query]);

  const loadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      imagesAPI.fetchImages(query, page).then(data => {
        setIsLoading(false);

        if (data.totalHits - images.length <= 12) {
          toast.error(
            "We're sorry, but you've reached the end of search results."
          );

          setAreLastImages(true);
        }

        setImages(images => {
          return [...images, ...data.hits.map(image => image)];
        });
      });

      setPage(value => {
        return value + 1;
      });
    }, 1000);
  };

  return (
    <>
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            largeImage={largeImageURL}
            onImageClick={onImageClick}
            tags={tags}
          />
        ))}
      </Gallery>

      {!isLoading && (
        <Button
          areImages={images.length > 0}
          areLastImages={areLastImages}
          onClick={loadMore}
        />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};