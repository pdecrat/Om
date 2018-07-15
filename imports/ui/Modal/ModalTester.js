import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { openModal } from '/imports/state/app/modal';
import ContentBlock from '/imports/ui/Content/ContentBlock';
import ModalContent from '/imports/ui/Modal/ModalContent';

const Content = () =>
  <ModalContent>
    Hello Modal!!
  </ModalContent>

const ModalTester = ({ dispatchOpenModal }) =>
  <ContentBlock width={1} height={1} >
    <button onClick={e => { dispatchOpenModal(<Content />) }}>
      Open
    </button>
  </ContentBlock>


const mapStateToProps = state => ({ modal: state.app.modal });
const mapDispatchToProps = dispatch => ({
  dispatchOpenModal: content => dispatch(openModal(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalTester);
