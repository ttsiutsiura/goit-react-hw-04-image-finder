import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import imagesAPI from 'services/images-api';
import { Gallery } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { SpinnerContainer } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    isSpinnerVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextQuery = this.props.query;

    if (prevProps.query !== nextQuery) {
      this.setState({ isSpinnerVisible: true });

      setTimeout(() => {
        imagesAPI.fetchImages(nextQuery, 1).then(response => {
          this.setState({ isSpinnerVisible: false });
          this.props.onFetch(response.hits);

          if (response.totalHits <= 12) {
            this.props.ifLast();
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

  render() {
    return (
      <>
        {!this.state.isSpinnerVisible && (
          <Gallery>
            {this.props.images.map(({ id, webformatURL }) => (
              <ImageGalleryItem key={id} image={webformatURL} />
            ))}
          </Gallery>
        )}
        {!this.state.isSpinnerVisible && (
          <Button
            areImages={this.props.images.length > 0}
            areLastImages={this.props.areLastImages}
            onClick={this.props.onButtonClick}
          />
        )}

        <SpinnerContainer isHidden={!this.state.isSpinnerVisible}>
          <RotatingLines
            strokeColor="orange"
            strokeWidth="5"
            animationDuration="0.75"
            width="36"
            visible={this.state.isSpinnerVisible}
          />
        </SpinnerContainer>
      </>
    );
  }
}
