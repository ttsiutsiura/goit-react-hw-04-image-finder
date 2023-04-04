import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Header } from './App.styled';
import { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    showModal: false,
    currentImage: null,
  };

  handleSumbit = query => {
    this.setState({ query });
  };

  toggleModal = id => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    this.setState({ currentImage: id });
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
            onImageClick={this.toggleModal}
          />
        </main>
        <ToastContainer autoClose={2000} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} image={this.state.currentImage} />
        )}
      </>
    );
  }
}
