import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';

import ContentDataStore from './ContentDataStore';
import Modal from '/imports/ui/Modal/Modal';
import Grid from '/imports/ui/Grid';
import '/imports/ui/_lib/global-style';
import IconBar from '/imports/ui/IconBar/IconBar';
import Menu from '/imports/ui/Menu/Menu';
import { rem } from '/imports/ui/_lib/helpers-css';

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

const App = () =>
  <div>
    <StyledHeader>
      <StyledHeaderContent>
        <Menu />
        <ContentDataStore />
        <IconBar />
      </StyledHeaderContent>
    </StyledHeader>
    <Grid />
    <Modal />
  </div>

export default App
