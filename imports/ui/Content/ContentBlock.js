import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';

const StyledContentBlock = styled.section`
  border: 1px dashed #DDDDDD;
  background-color: white;
  padding: ${rem('10px')};
  min-width: ${rem('320px')};
  min-height: ${rem('64px')};
  grid-column-end: span ${props => props.width};
  ${media.big`grid-column-end: span ${props => props.width >= 1 ? props.width - 1 : 1};`}
  ${media.medium`grid-column-end: span ${props => props.width >= 3 ? 2 : 1};`}
  ${media.small`grid-column-end: span 1;`}
  grid-row-end: span ${props => props.height};
`

const ContentBlock = ({ width = 1, height = 1, children }) =>
  <StyledContentBlock width={width} height={height}>
    {children}
  </StyledContentBlock>

export default ContentBlock;
