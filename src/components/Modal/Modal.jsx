import { Component } from 'react';
import { Overlay } from './Modal.styled';
import { ModalEl } from './Modal.styled';
import { Image } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalEl>
          <Image src={this.props.image} alt="" />
        </ModalEl>
      </Overlay>
    );
  }
}
