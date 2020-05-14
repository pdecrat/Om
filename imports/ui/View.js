import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import Blocks from '/imports/core/Blocks';

import AppBar from '/imports/ui/AppBar/AppBar';
import Content from '/imports/ui/Content';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const StyledView = styled('div')({
  height: '100vh',
  backgroundColor: 'white',
  paddingTop: '48px',
  overflow: 'hidden'
});
const StyledContentContainer = styled(
  ({isEdited, ...rest}) => <div {...rest} />)({
  transform: ({ isEdited }) => isEdited ? 'translateY(48px)' : 'translateY(0)',
  transition: 'transform 0.1s linear',
})


const View = () => {
  const { isEdited } = useContext(UIContext);
  const { view } = useContext(ViewContext);

  return (
    <StyledView>
      <AppBar />
      <StyledContentContainer isEdited={isEdited} >
        <Content />
      </StyledContentContainer>
    </StyledView>
  )
}

export default View;
