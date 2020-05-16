import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import ViewActionBar from '/imports/ui/AppBar/ViewActionBar';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';

const StyledEditSlider = styled(({ isEdited, ...rest }) => <Paper {...rest} />)({
  opacity: ({ isEdited }) => { return isEdited ? 1 : 0 },
  transition: 'opacity 0.1s linear',
  position: 'absolute',
  marginTop: '48px',
  backgroundColor: 'white',
  width: '100%',
  height: '48px',
})

const EditSlider = () => {
  const { isEdited } = useContext(UIContext);

  return (
      <StyledEditSlider isEdited={isEdited} elevation={0} square>
        <Slide in={isEdited}>
          <Box>
            <ViewActionBar />
          </Box>
        </Slide>
      </StyledEditSlider>
  )
}

export default EditSlider;
