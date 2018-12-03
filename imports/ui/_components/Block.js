import React from 'react';
import styled, { keyframes } from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const StyledBlock = styled.section`
  background-color: white;
  min-width: ${rem('320px')};
  min-height: ${rem('64px')};
  overflow-x: hidden;
  grid-column-end: span ${props => props.width};
  ${media.big`grid-column-end: span ${props => props.width > 1 ? props.width - 1 : 1};`}
  ${media.medium`grid-column-end: span ${props => props.width >= 3 ? 2 : 1};`}
  ${media.small`grid-column-end: span 1;`}
  grid-row-end: span ${props => props.height};
  animation: ${fadeIn} 0.1s linear;
  transition: box-shadow 0.1s linear;
  & > * {
    width: 100%;
    height: 100%;
  }
  &:hover {
    box-shadow: inset 0 0 1px grey;
  }
`

const Block = ({ width = 1, height = 1, children }) =>
  <StyledBlock width={width} height={height}>
    {children}
  </StyledBlock>

export default Block;
