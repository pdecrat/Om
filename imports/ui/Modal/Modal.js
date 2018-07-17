import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import { closeModal } from '/imports/state/redux/ui/modal';

const StyledModal = styled.div`
  display: ${props => props.open ? 'flex' : 'none' };
  position: fixed;
  justify-content: center;
  z-index: 200;
  padding: ${rem('64px')};
  ${media.small`padding: 0;`}
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`

const Modal = ({ modal, dispatchCloseModal }) =>
  <StyledModal
    open={modal.open}
    onClick={e => { dispatchCloseModal() }}
  >
    {modal.content}
  </StyledModal>

const mapStateToProps = state => ({ modal: state.ui.modal });
const mapDispatchToProps = dispatch => ({
  dispatchCloseModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
