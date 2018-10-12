import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';

import SpaceList from './SpaceList';
import SpaceMenu from './SpaceMenu';

const StyledPanel = styled.div`
{
  position: fixed;
  left: 0;
  top: 0;
  width: ${rem('268px')};
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

const Panel = ({ menu, dispatchCloseMenu, width }) =>
  <StyledPanel
      isOpen={menu.open}
      width={width}
    >
      <SpaceList />
      <SpaceMenu />
  </StyledPanel>

const mapStateToProps = state => ({ menu: state.ui.menu });
const mapDispatchToProps = dispatch => ({
  dispatchCloseMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
