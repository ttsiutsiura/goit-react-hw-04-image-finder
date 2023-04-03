import styled from '@emotion/styled';

export const GalleryItem = styled.li`
  height: 230px;

  margin: 15px;
  width: calc((100% - 8 * 15px) / 4);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
  }
}
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;
