import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

import Search from './Search';
import User from './User';
import Alarm from './Alarm';

const StyledIconBar = styled.ul`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
  align-items: center;
`

const IconBar = () =>
  <StyledIconBar>
    {/* <Search /> */}
    {/* <Alarm /> */}
    <User />
  </StyledIconBar>

export default IconBar;
