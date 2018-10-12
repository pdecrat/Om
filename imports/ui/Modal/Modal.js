import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import { closeModal } from '/imports/ui/_state/ui/modal';

const StyledModal = styled.div`
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  display: flex;
  position: fixed;
  justify-content: center;
  z-index: 200;
  padding: ${rem('64px')};
  ${media.small`padding: 0;`}
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.isOpen ? `rgba(0,0,0,0.2)` : `rgba(0,0,0,0)`};
  transition: background-color 0.4s;
`

const Modal = ({ modal, dispatchCloseModal }) =>
  <StyledModal
    isOpen={modal.open}
    onClick={e => { dispatchCloseModal() }}
  >
    {modal.content}
  </StyledModal>

const mapStateToProps = state => ({ modal: state.ui.modal });
const mapDispatchToProps = dispatch => ({
  dispatchCloseModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
