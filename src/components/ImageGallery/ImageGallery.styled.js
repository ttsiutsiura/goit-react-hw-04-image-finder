import styled from '@emotion/styled';

export const Gallery = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${p => {
    return p.isHidden ? '0px' : '12px';
  }};
`;
