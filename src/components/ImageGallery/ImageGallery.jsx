import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import imagesAPI from 'services/images-api';
import { Gallery } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

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
    }

    if (prevProps.query === this.state.query && prevProps.query !== '') {
      toast.error('Enter another search query.');
    }

    if (prevProps.query !== this.props.query) {
      this.setState({ isLoading: true });

      setTimeout(() => {
        imagesAPI
          .fetchImages(this.props.query, this.state.page)
          .then(response => {
            this.setState({ isLoading: false });

            window.scroll({
              top: 0,
              behavior: 'smooth',
            });

            this.setState({ images: response.hits });

            this.setState(prevState => {
              return { page: prevState.page + 1 };
            });

            if (response.totalHits <= 12) {
              this.setState({ areLastImages: true });
            }

            if (response.totalHits > 0) {
              toast.info(`Hooray! We found ${response.totalHits} images.`);
            }

            if (response.totalHits === 0) {
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
      imagesAPI
        .fetchImages(this.props.query, this.state.page)
        .then(response => {
          this.setState({ isLoading: false });

          if (response.totalHits - this.state.images.length <= 12) {
            toast.error(
              "We're sorry, but you've reached the end of search results."
            );
            this.setState({ areLastImages: true });
          }

          this.setState({
            images: [
              ...this.state.images,
              ...response.hits.map(image => image),
            ],
          });
        });

      this.setState(prevState => {
        return { page: prevState.page + 1 };
      });
    }, 1000);
  };

  render() {
    return (
      <>
        <Gallery>
          {this.state.images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              largeImage={largeImageURL}
              onImageClick={this.props.onImageClick}
            />
          ))}
        </Gallery>

        {!this.state.isLoading && (
          <Button
            areImages={this.state.images.length > 0}
            areLastImages={this.state.areLastImages}
            onClick={this.loadMore}
          />
        )}
        <Loader isLoading={this.state.isLoading} />
      </>
    );
  }
}
