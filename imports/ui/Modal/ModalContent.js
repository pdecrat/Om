import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledContent = styled.div`
  position: relative;
  min-width: ${rem('320px')};
  background: rgba(255,255,255,0.98);
  padding: ${rem('15px')};
  overflow-x: hidden;
  overflow-y: scroll;
`

const ModalContent = ({ children }) =>
  <StyledContent onClick={e => { e.stopPropagation() }}>
    {children}
  </StyledContent>

export default ModalContent;
