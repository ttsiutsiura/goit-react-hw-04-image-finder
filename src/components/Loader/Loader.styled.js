import styled from "@emotion/styled";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${p => {
    return p.isHidden ? '0px' : '15px auto 30px auto';
  }};
`;