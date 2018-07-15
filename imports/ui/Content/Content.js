import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import ModalTester from '/imports/ui/Modal/ModalTester';

import ContentBlock from './ContentBlock';

const StyledContent = styled.div`
  height: 100vh;
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
  overflow: scroll;
`

const Content = () =>
  <StyledContent>
    <ContentBlock width={4} height={2} />
    <ContentBlock width={1} height={2} />
    <ContentBlock width={3} height={6} />
    <ModalTester />
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
  </StyledContent>

export default Content;
