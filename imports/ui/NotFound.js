import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

const notFoundSpace = {
  name: "???",
  blocks: {}
}

const StyledNotFound = styled.div`
  height: 100vh;
  padding-top: ${rem('164px')};
  text-align: center;
  vertical-align: middle;
`

const NotFound = () =>
  <StyledNotFound>Space not found (black hole ?)</StyledNotFound>

export default NotFound;
