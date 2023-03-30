import styled from '@emotion/styled';

export const SearchbarForm = styled.form`
  height: 36px;
  border-radius: 6px;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  gap: 10px;
`;

export const SearchbarInput = styled.input`
  padding: 6px;
  width: 250px;
  border: none;
  border-radius: 6px;
  padding-left: 6px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

export const SearchbarButton = styled.button`
  border-radius: 6px;
  border: none;
  padding: 6px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  display: inline-block;

  :hover,
  :focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;
