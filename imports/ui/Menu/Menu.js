import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import { toggleMenu } from '/imports/state/redux/ui/menu';

import Panel from './Panel';

const StyledMenu = styled.div`
  display: block;
  position: relative;
  width: ${rem('44px')};
  height: ${rem('44px')};
  user-select: none;
  padding: ${rem('5px')};
  padding-top: ${rem('12px')};
  & input {
    z-index: 1;
    display: block;
    width: ${rem('44px')};
    height: ${rem('44px')};
    margin: 0;
    left: 0;
    top: 0;
    position: absolute;
    cursor: pointer;
    opacity: 0;
  }
  & input:checked ~ ul {
    transform: none;
  }
  & span {
    display: block;
    width: ${rem('33px')};
    height: ${rem('4px')};
    margin-bottom: ${rem('5px')};
    position: relative;

    background: black;
    border-radius: ${rem('3px')};

    transform-origin: ${rem('4px')} ${rem('1px')};
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }
  & span:first-child {
   transform-origin: 0% 0%;
  }
  & span:nth-last-child(2) {
   transform-origin: 0% 100%;
  }
  & input:checked ~ span {
   opacity: 1;
   transform: rotate(45deg) translate(0, ${rem('-1px')});
  }
  & input:checked ~ span:nth-last-child(2) {
   opacity: 0;
   transform: rotate(0deg) scale(0.2, 0.2);
  }
  & input:checked ~ span:nth-last-child(1) {
   transform: rotate(-45deg) translate(0, ${rem('-1px')});
  }
`

const Menu = ({ menu, dispatchToggleMenu }) =>
  <StyledMenu>
    <Panel />
    <input
      type="checkbox"
      onClick={e => { dispatchToggleMenu() }}
      checked={menu.open}
    />

    <span></span>
    <span></span>
    <span></span>
  </StyledMenu>

const mapStateToProps = state => ({ menu: state.ui.menu });
const mapDispatchToProps = dispatch => ({
  dispatchToggleMenu: () => dispatch(toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
