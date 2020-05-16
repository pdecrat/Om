import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Blocks from '/imports/core/Blocks';

import AppBar from '/imports/ui/AppBar/AppBar';
import Content from '/imports/ui/Content/Content';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledView = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

const StyledAppBarContainer = styled(({ isEdited, ...rest }) => <Box {...rest} />)({
  flex: ({ isEdited }) => isEdited ? '0 0 96px' : '0 0 48px',
  backgroundColor: 'white',
  transition: `flex ${animationSpeed}`,
  height: '100vh',
});

const View = () => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledView>
      <StyledAppBarContainer>
        <AppBar />
      </StyledAppBarContainer>
      <Content />
    </StyledView>
  )
}

export default View;
