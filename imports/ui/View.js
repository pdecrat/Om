import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Content from '/imports/ui/Content/Content';
import EditModeSpacer from '/imports/ui/_components/EditModeSpacer';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import AppBar from '/imports/ui/AppBar/AppBar';

const StyledView = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
});
const StyledContentContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
});

const View = () => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledView>
      <AppBar />
      <EditModeSpacer minSize={'48px'} maxSize={'96px'} isOpen={isEdited} />
      <StyledContentContainer>
        <EditModeSpacer maxSize={'60px'} isOpen={isEdited} />
        <div style={{ flexGrow: 1 }}>
          <Content />
        </div>
        <EditModeSpacer maxSize={'12px'} isOpen={isEdited} />
      </StyledContentContainer>
      <EditModeSpacer maxSize={'12px'} isOpen={isEdited} />
    </StyledView>
  )
}

export default View;
