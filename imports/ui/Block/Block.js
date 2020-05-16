import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Blocks from '/imports/core/Blocks';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockContainer = styled(({ isPreview, ...rest }) => <Paper {...rest} />)({
  width: ({ isPreview }) => isPreview ? '200px' : 'auto',
  height: ({ isPreview }) => isPreview ? '100px' : 'auto',
  transition: `box-shadow ${animationSpeed}`,
})

const BlockContainer = ({ block, index, isPreview = false }) => {
  const [ shouldRender, setShouldRender ] = useState(false);
  const { isEdited } = useContext(UIContext);
  const Component = Blocks.get(block.name);
  useEffect(() => {
    setShouldRender(true);
  }, [])

  return (
    <StyledBlockContainer
      elevation={isEdited ? 2 : 0}
      square
      isPreview={isPreview}
    >
          {shouldRender ? <Component block={block} /> : null }
    </StyledBlockContainer>
  );
}

export default BlockContainer;
