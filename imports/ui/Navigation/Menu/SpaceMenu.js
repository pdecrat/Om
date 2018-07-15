import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const StyleSpaceMenu = styled.div`
  background-color: #2f3136;
  width: ${rem('230px')};
`

const SpaceMenu = () =>
  <StyleSpaceMenu>
    Heyo
  </StyleSpaceMenu>

export default SpaceMenu;
