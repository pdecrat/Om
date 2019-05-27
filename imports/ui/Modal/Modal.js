import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import { InterfaceContext } from '/imports/ui/Interface';

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
export function useModal() {
  const [isModalOpen, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  function openWithContent(component) {
    setModalContent(component);
    setModal(true);
  }
  function closeModal() {
    setModalContent(null);
    setModal(false);
  }
  return {
    isModalOpen,
    modalContent,
    openWithContent,
    closeModal
  }
}

const Modal = () => {
  const {
    modalContent,
    isModalOpen,
    closeModal
  } = useContext(InterfaceContext);
  return (
    <StyledModal
      isOpen={isModalOpen}
      onClick={e => { closeModal() }}
    >
        {modalContent}
    </StyledModal>
  )
}

export default Modal;
