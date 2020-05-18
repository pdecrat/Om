import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import EditModeSpacer from '/imports/ui/_components/EditModeSpacer';


const StyledColumns = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledLines = styled(Box)({
  flexGrow: 1,
  display: 'flex',
});

const ExpandableContainer = ({ children, t = '12px', l = '12px', r = '12px', b = '12px' }) => {

  return (
    <StyledColumns>
      <EditModeSpacer maxSize={t} />
      <StyledLines>
        <EditModeSpacer maxSize={l} />
          <div style={{ flexGrow: 1 }}>
            {children}
          </div>
        <EditModeSpacer maxSize={r} />
      </StyledLines>
      <EditModeSpacer maxSize={b} />
    </StyledColumns>
  )
}

export default ExpandableContainer;
