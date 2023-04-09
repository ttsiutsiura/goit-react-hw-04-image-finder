import { useState } from 'react';
import { SearchbarForm } from './Searchbar.styled';
import { SearchbarInput } from './Searchbar.styled';
import { SearchbarButton } from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;

    setQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  return (
    <SearchbarForm onSubmit={handleSubmit}>
      <SearchbarInput
        type="text"
        name="searchQuery"
        autoComplete="off"
        autoFocus="on"
        value={query}
        placeholder="Search images and photos"
        onChange={handleChange}
      />
      <SearchbarButton
        type="submit"
        disabled={query.trim() === '' ? true : false}
      >
        Search
      </SearchbarButton>
    </SearchbarForm>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
