import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const StyledSpaceList = styled.ul`
  width: ${rem('70px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #202225;
`

const StyledSpace = styled.li`
  width: ${rem('50px')};
  height: ${rem('50px')};
  border-radius: ${rem('25px')};
  background-color: rgb(47, 49, 54);
  text-align: center;
  color: #fff;
  line-height: ${rem('50px')};
  margin-top: ${rem('10px')};
`

const SpaceList = () =>
  <StyledSpaceList>
    <StyledSpace>He</StyledSpace>
    <StyledSpace>Om</StyledSpace>
    <StyledSpace>Oh</StyledSpace>
    <StyledSpace>H</StyledSpace>
    <StyledSpace>U</StyledSpace>
  </StyledSpaceList>

export default SpaceList;
