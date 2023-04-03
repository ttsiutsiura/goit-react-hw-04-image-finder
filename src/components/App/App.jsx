import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Header } from './App.styled';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import imagesAPI from 'services/images-api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: '',
    page: 2,
    images: [],
    areLastImages: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 2, areLastImages: false });
    }
  }

  // toggleSpinner = () => {
  //   this.setState((prevProps, prevState) => {
  //     return { isSpinnerVisible: !prevState.isSpinnerVisible };
  //   });
  // };

  doThis = value => {
    this.setState({ areLastImages: true });
  };

  handleSumbit = query => {
    this.setState({ query });
  };

  getImages = response => {
    this.setState(() => {
      return { images: response };
    });
  };

  loadMore = () => {
    imagesAPI.fetchImages(this.state.query, this.state.page).then(response => {
      if (response.totalHits - this.state.images.length <= 12) {
        toast.error(
          "We're sorry, but you've reached the end of search results."
        );
        this.setState({ areLastImages: true });
      }

      this.setState({
        images: [...this.state.images, ...response.hits.map(image => image)],
      });
    });

    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <>
        <Header>
          <Searchbar onSubmit={this.handleSumbit} />
        </Header>
        <main>
          <ImageGallery
            query={this.state.query}
            images={this.state.images}
            page={this.state.page}
            onFetch={this.getImages}
            ifLast={this.doThis}
            // toggleSpinner={this.toggleSpinner}
            areImages={this.state.images.length > 0}
            areLastImages={this.state.areLastImages}
            onButtonClick={this.loadMore}
          />
          
        </main>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
