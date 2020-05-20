import React from 'react';
import { styled } from '@material-ui/core/styles';

const StyledActionBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
})

const ActionBar = ({ children }) => {
  return (
    <StyledActionBar>
      {children}
    </StyledActionBar>
  )
}

export default ActionBar;
