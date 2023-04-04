import { Component } from 'react';
import { SearchbarForm } from './Searchbar.styled';
import { SearchbarInput } from './Searchbar.styled';
import { SearchbarButton } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    const { value } = evt.target;

    this.setState({ searchQuery: value });
  };

  handleSubmit = evt => {
    const searchQuery = this.state.searchQuery;

    evt.preventDefault();

    this.props.onSubmit(searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    const searchQuery = this.state.searchQuery;

    return (
      <SearchbarForm onSubmit={this.handleSubmit}>
        <SearchbarInput
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus="on"
          value={searchQuery}
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
        <SearchbarButton
          type="submit"
          disabled={searchQuery.trim() === '' ? true : false}
        >
          Search
        </SearchbarButton>
      </SearchbarForm>
    );
  }
}
