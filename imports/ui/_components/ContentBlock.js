import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { media } from '/imports/ui/_helpers/media-queries';

const StyledContentBlock = styled.section`
  border: 1px dashed #DDDDDD;
  background-color: white;
  padding: ${rem('10px')};
  min-width: ${rem('320px')};
  min-height: ${rem('64px')};
  grid-column-end: span ${props => props.width};
  ${media.medium`grid-column-end: span ${props => props.width >= 3 ? 4 : 2};`}
  ${media.small`grid-column-end: span 1;`}
  grid-row-end: span ${props => props.height};
`

const ContentBlock = ({ width = 1, height = 1 }) =>
  <StyledContentBlock width={width} height={height}>

  </StyledContentBlock>

export default ContentBlock;
