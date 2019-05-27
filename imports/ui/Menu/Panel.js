import React, { useContext } from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

import SpaceList from './SpaceList';
import SpaceMenu from './SpaceMenu';
import { InterfaceContext } from '/imports/ui/Interface';

const StyledPanel = styled.div`
{
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: ${rem('300px')};
  height: 100%;
  z-index: -1;
  background-color: white;
  transform: ${({ isOpen }) => isOpen ?
    'none'
    : `translateX(-100%)`
  };
  transition: transform 0.2s;
  & > div {
    transition: ${({ isOpen }) => isOpen ? 'opacity 0.19s' : 'opacity 0.01s'};
    opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  }
}`

const Panel = () => {
  const { isMenuOpen } = useContext(InterfaceContext);

  return (
    <StyledPanel
        isOpen={isMenuOpen}
      >
        <SpaceList />
        <SpaceMenu />
    </StyledPanel>
  )
}

export default Panel;
