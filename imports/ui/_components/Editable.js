import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import { UIContext } from '/imports/ui/_providers/UIProvider';

const StyledEditable = styled(({ isEdited, ...props }) => <div {...props} />)({
  transform: ({ isEdited }) => isEdited ? 'scale(0.9)' : 'scale(1)',
  opacity: ({ isEdited }) => isEdited ? '0.9' : '1',
  transition: 'transform .2s ease-in-out, opacity .2s ease-in-out'
});

const Editable = ({ children }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledEditable isEdited={isEdited}>
      {children}
    </StyledEditable>
  )
}

export default Editable;
