import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';

const StyledBlock = styled.section`
  border: 1px dashed #DDDDDD;
  background-color: white;
  min-width: ${rem('320px')};
  min-height: ${rem('64px')};
  overflow-x: hidden;
  grid-column-end: span ${props => props.width};
  ${media.big`grid-column-end: span ${props => props.width > 1 ? props.width - 1 : 1};`}
  ${media.medium`grid-column-end: span ${props => props.width >= 3 ? 2 : 1};`}
  ${media.small`grid-column-end: span 1;`}
  grid-row-end: span ${props => props.height};
  & > * {
    width: 100%;
    height: 100%;
  }
`

const Block = ({ width = 1, height = 1, children }) =>
  <StyledBlock width={width} height={height}>
    {children}
  </StyledBlock>

export default Block;
