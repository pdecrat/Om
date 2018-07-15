import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import Breadcrumbs from './Breadcrumbs';
import IconBar from './IconBar/IconBar';
import Menu from './Menu/Menu';

const StyledHeader = styled.header`
  position: fixed;
  min-height: ${rem('64px')};
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
`

const StyledHeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: ${rem('64px')};
  padding-right: ${rem('15px')};
  padding-left: ${rem('15px')};
  box-shadow: 0 ${rem('1px')} ${rem('2px')} rgba(0,0,0,0.06);
  background: rgba(255,255,255,0.98);
`

const Header = () =>
  <StyledHeader>
    <StyledHeaderContent>
      <Menu />
      <Breadcrumbs />
      <IconBar />
    </StyledHeaderContent>
  </StyledHeader>

export default Header;
