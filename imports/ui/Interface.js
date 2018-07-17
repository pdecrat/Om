import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import '/imports/ui/_lib/global-style';
import { media } from '/imports/ui/_lib/helpers-css';
import Collections from '/imports/api/Collections';
import Grid from '/imports/ui/Grid';
import Navigation from '/imports/ui/Navigation/Navigation';
import Modal from '/imports/ui/Modal/Modal';

const StyledInterface = styled.div`
`

const Interface = () =>
  <StyledInterface>
    <Navigation />
    <Grid />
    <Modal />
  </StyledInterface>

export default Interface;
