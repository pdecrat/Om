import React from 'react';
import styled from 'styled-components';
import { User as Fuser } from 'react-feather';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledUser = styled.li`
  margin-right: 5px;
  & > svg {
    border: 2px solid;
    border-radius: 50%;
  }
`

const User = () =>
  <StyledUser>
    <Fuser size={32} />
  </StyledUser>

export default User;
