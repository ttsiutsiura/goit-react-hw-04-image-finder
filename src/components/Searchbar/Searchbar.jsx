import { Component } from 'react';
import { SearchbarInput } from './Searchbar.styled';
import { SearchbarButton } from './Searchbar.styled';
import { SearchbarForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    const { value } = evt.target;

    this.setState({ searchQuery: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    // this.props.onSubmit(this.state);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarForm onSubmit={this.handleSubmit}>
        <SearchbarInput
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus="on"
          value={this.state.searchQuery}
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
        <SearchbarButton type="submit">Search</SearchbarButton>
      </SearchbarForm>
    );
  }
}
