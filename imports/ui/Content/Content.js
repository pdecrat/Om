import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { media } from '/imports/ui/_helpers/media-queries';
import ContentBlock from '/imports/ui/_components/ContentBlock';

const StyledContent = styled.main`
  background-color: #ebebeb;
  padding-top: ${rem('64px')};
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  ${media.big`
    grid-template-columns: repeat(3, 1fr);
  `};
  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.small`
    grid-template-columns: repeat(1, 1fr);
  `}
  grid-auto-flow: dense;
  grid-auto-rows: ${rem('64px')};
`

const Content = () =>
  <StyledContent>
    <ContentBlock width={4} height={2} />
    <ContentBlock width={1} height={2} />
    <ContentBlock width={3} height={6} />
    <ContentBlock width={1} height={4} />
    <ContentBlock width={2} height={2} />
    <ContentBlock width={1} height={6} />
    <ContentBlock width={1} height={4} />
    <ContentBlock width={2} height={4} />
    <ContentBlock width={2} height={2} />
    <ContentBlock width={4} height={2} />
    <ContentBlock width={3} height={6} />
    <ContentBlock width={1} height={2} />
    <ContentBlock width={2} height={2} />
    <ContentBlock width={2} height={2} />
  </StyledContent>

export default Content;
