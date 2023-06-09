import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`;

export const ModalEl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 500px;
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
`;
