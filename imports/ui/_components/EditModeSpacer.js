import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import { UIContext } from '/imports/ui/_providers/UIProvider';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledEditModeSpacer = styled(({ isEdited, maxSize, ...rest }) => <div {...rest} />)({
  flex: ({ isEdited, maxSize }) => isEdited ? `0 0 ${maxSize}` : '0 0 0',
  transition: `flex ${animationSpeed}`,
});

const EditModeSpacer = ({ maxSize = '48px' }) => {
  const { isEdited } = useContext(UIContext);

  return <StyledEditModeSpacer maxSize={maxSize} isEdited={isEdited} />
}

export default EditModeSpacer;
