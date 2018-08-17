import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import { closeMenu } from '/imports/ui/_state/ui/menu';

import SpaceList from './SpaceList';
import SpaceMenu from './SpaceMenu';

const StyledPanel = styled.div`
{
  position: fixed;
  left: 0;
  top: 0;
  width: ${rem('300px')};
  z-index: -1;
  display: flex;
  ${'' /* align-items: stretch; */}

  height: 100%;
  padding-top: ${rem('64px')};

  box-shadow: ${props => props.isOpen ? `0 ${rem('2px')} ${rem('4px')} rgba(0,0,0,0.12)` : 'none'};
  background: rgba(255,255,255,0.98);
  transform-origin: 0% 0%;
  transform: ${props => props.isOpen ? 'none' : 'translate(-100%, 0)'};
  transition: transform 0.4s cubic-bezier(.44,.8,.86,.9);
}`

const StyledBackground = styled.div`
{
  display: block;
  position: fixed;
  z-index: -2;
  top: 0;
  left: 0;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  width: 100%;
  height: 100%;
  opacity: ${props => props.isOpen ? '0.8' : '0'};
  transition: opacity 0.4s cubic-bezier(.44,.8,.86,.9);
  background-color: rgba(0,0,0,.2);
}`


const Panel = ({ menu, dispatchCloseMenu }) =>
  <div>
    <StyledPanel
      isOpen={menu.open}
    >
      <SpaceList />
      {/* <SpaceMenu /> */}
    </StyledPanel>
    <StyledBackground
      isOpen={menu.open}
      onClick={e => { dispatchCloseMenu() }}
    />
  </div>

const mapStateToProps = state => ({ menu: state.ui.menu });
const mapDispatchToProps = dispatch => ({
  dispatchCloseMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
