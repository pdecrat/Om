import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledContent = styled.div`
  position: relative;
  min-width: ${rem('320px')};
  background: rgba(255,255,255,0.98);
`

const ModalContent = ({ children }) =>
  <StyledContent onClick={e => { e.stopPropagation() }}>
    {children}
  </StyledContent>

const mapStateToProps = state => ({ modal: state.app.modal });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
