import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import UserMenu from '/imports/ui/UserMenu/UserMenu';

const StyledHUD = styled(Box)({
  position : 'absolute',
  width: '100vw',
  minHeight: '48px',
})

const HeadUpDisplay = () => {
  return (
    <StyledHUD>
      <UserMenu />
    </StyledHUD>
  );
}

export default HeadUpDisplay;
