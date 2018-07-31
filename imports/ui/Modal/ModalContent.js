import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import Scroller from '/imports/ui/_components/Scroller';

const StyledContent = styled.div`
  position: relative;
  min-width: ${rem('320px')};
  background: rgba(255,255,255,0.98);
  padding: ${rem('15px')};
  overflow-x: hidden;
  overflow-y: scroll;
`

const ModalContent = ({ children }) =>
  <Scroller>
    <StyledContent onClick={e => { e.stopPropagation() }}>
      {children}
    </StyledContent>
  </Scroller>

const mapStateToProps = state => ({ modal: state.ui.modal });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
