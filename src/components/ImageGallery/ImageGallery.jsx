import imagesAPI from 'services/ImagesApi';
import { toast } from 'react-toastify';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    areLastImages: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ page: 1, areLastImages: false });
      this.setState({ isLoading: true });

      setTimeout(() => {
        const query = this.props.query;
        const page = this.state.page;

        imagesAPI.fetchImages(query, page).then(data => {
          this.setState({ isLoading: false });
          this.setState({ images: data.hits });

          window.scroll({
            top: 0,
            behavior: 'smooth',
          });

          this.setState(prevState => {
            return { page: prevState.page + 1 };
          });

          if (data.totalHits <= 12) {
            this.setState({ areLastImages: true });
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
    }
  }

  loadMore = () => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      const query = this.props.query;
      const page = this.state.page;

      imagesAPI.fetchImages(query, page).then(data => {
        this.setState({ isLoading: false });

        if (data.totalHits - this.state.images.length <= 12) {
          toast.error(
            "We're sorry, but you've reached the end of search results."
          );

          this.setState({ areLastImages: true });
        }

        this.setState({
          images: [...this.state.images, ...data.hits.map(image => image)],
        });
      });

      this.setState(prevState => {
        return { page: prevState.page + 1 };
      });
    }, 1000);
  };

  render() {
    const images = this.state.images;

    return (
      <>
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              largeImage={largeImageURL}
              onImageClick={this.props.onImageClick}
              tags={tags}
            />
          ))}
        </Gallery>

        {!this.state.isLoading && (
          <Button
            areImages={images.length > 0}
            areLastImages={this.state.areLastImages}
            onClick={this.loadMore}
          />
        )}
        <Loader isLoading={this.state.isLoading} />
      </>
    );
  }
}
