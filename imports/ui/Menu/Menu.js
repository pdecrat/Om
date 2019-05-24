import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MoreVertical } from 'react-feather';

import { rem } from '/imports/ui/_lib/helpers-css';
import Background from '/imports/ui/_components/Background';
import Avatar from '/imports/ui/_components/Avatar';
import { toggleMenu, closeMenu } from '/imports/ui/_state/ui/menu';
import Breadcrumbs from '/imports/ui/Menu/Breadcrumbs';
import IconBar from '/imports/ui/IconBar/IconBar';
import Panel from '/imports/ui/Menu/Panel';

const StyledHeader = styled.header`
  position: fixed;
  height: ${props => rem(props.theme.size.nav)};
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
  background: white;
  transition: transform 0.35s;
  transform: ${({ isHidden }) => isHidden ? 'translateY(-50px)' : 'unset'}
`

const StyledMenu = styled.div`
  height: ${rem('46px')};
  padding: ${rem('5px')};
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  cursor: pointer;
  &:hover div span:first-child {
    transform: translateY(22px);
    opacity: 0;
  }
  &:hover div span:nth-child(2) {
    transform: translateY(11px);
    opacity: 0;
  }
  &:hover div span:last-child {
    transform: scale(1.2, 1.2);
  }
`

const StyledDots = styled.div`
  margin: 0 10px;
  display: flex;
  height: 34px;
  flex-direction: column;
  justify-content: space-evenly;
`

const StyledDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: #3a3a3a;
  border-radius: 50%;
  transition: transform 0.15s ease-out, opacity 0.20s ease-out;
`

const Menu = ({
  menu,
  dispatchToggleMenu,
  dispatchCloseMenu,
  context,
}) =>
  <StyledHeader isHidden={menu.hidden}>
    <StyledMenu
      onClick={e => { dispatchToggleMenu() }}
    >
      <StyledDots>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
      </StyledDots>
      <Avatar object={context.doc} size={36} />
      <Breadcrumbs match={context.match} query={context.query} />
    </StyledMenu>
    <Panel />
    <Background
      isOpen={menu.open}
      func={e => { dispatchCloseMenu() }}
      zIndex={-2}
    />
    <IconBar />
  </StyledHeader>

const mapStateToProps = state => ({
  menu: state.ui.menu,
  context: state.context,
});
const mapDispatchToProps = dispatch => ({
  dispatchToggleMenu: () => dispatch(toggleMenu()),
  dispatchCloseMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
