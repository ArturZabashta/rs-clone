import React from 'react';
import styled from 'styled-components';

import { Props } from '../../types/uiInterface';

import '../../styles/index.scss';

const StyledHamburger = styled.button<{ menuOn: boolean }>`
  div {
    :first-child {
      transform: ${({ menuOn }) => (menuOn ? 'rotate(45deg)' : 'rotate(0)')};
    }
    :nth-child(2) {
      opacity: ${({ menuOn }) => (menuOn ? '0' : '1')};
      transform: ${({ menuOn }) => (menuOn ? 'translateX(20px)' : 'translateX(0)')};
    }
    :nth-child(3) {
      transform: ${({ menuOn }) => (menuOn ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Hamburger = (props: Props) => (
  <StyledHamburger className="hamburger" menuOn={props.menuOn} onClick={() => props.setMenuOn(!props.menuOn)}>
    <div />
    <div />
    <div />
  </StyledHamburger>
);
export default Hamburger;
