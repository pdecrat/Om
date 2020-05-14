import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { UIContext } from '/imports/ui/_providers/UIProvider';

const StyledEditable = styled(({ isEdited, ...props }) => <Paper {...props} />)({
  transform: ({ isEdited }) => isEdited ? 'scale(0.9) translateX(32px)' : 'scale(1) translateX(0)',
  opacity: ({ isEdited }) => isEdited ? '0.9' : '1',
  transition: 'transform .1s ease-in-out, opacity .1s ease-in-out'
});

const Editable = ({ children }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledEditable
      isEdited={isEdited}
      elevation={isEdited ? 1 : 0}
      square
    >
      {children}
    </StyledEditable>
  )
}

export default Editable;
