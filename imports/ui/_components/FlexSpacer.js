import React from 'react';
import { styled } from '@material-ui/core/styles';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledFlexSpacer = styled(({ isOpen, maxSize, minSize, ...rest }) => <div {...rest} />)({
  flex: ({ isOpen, maxSize, minSize }) => isOpen ? `0 0 ${maxSize}` : `0 0 ${minSize}`,
  transition: `flex ${animationSpeed}`,
});

const FlexSpacer = ({ minSize = '0', maxSize = '48px', isOpen = false }) => {

  return <StyledFlexSpacer minSize={minSize} maxSize={maxSize} isOpen={isOpen} />
}

export default FlexSpacer;
