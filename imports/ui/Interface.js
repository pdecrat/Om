import React from 'react';
import styled from 'styled-components';

import '/imports/ui/_lib/global-style';
import { media } from '/imports/ui/_lib/helpers-css';

import Content from '/imports/ui/Content/Content';
import Navigation from '/imports/ui/Navigation/Navigation';
import Modal from '/imports/ui/Modal/Modal';

const StyledInterface = styled.div`
`

const Interface = () =>
  <StyledInterface>
    <Navigation />
    <Content />
    <Modal />
  </StyledInterface>

export default Interface;
