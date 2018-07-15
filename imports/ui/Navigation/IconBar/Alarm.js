import React from 'react';
import styled from 'styled-components';
import { Bell } from 'react-feather';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledAlarm = styled.li`
  margin-right: 10px;
`

const Alarm = () =>
  <StyledAlarm>
    <Bell size={26} />
  </StyledAlarm>

export default Alarm;
