import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Blocks from '/imports/core/Blocks';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockContainer = styled(({ isPreview, ...rest }) => <Paper {...rest} />)({
  overflowY: 'hidden',
  minHeight: '48px',
  transition: `box-shadow ${animationSpeed}`,
})

const BlockContainer = ({ block, isPreview = false }) => {
  const [ shouldRender, setShouldRender ] = useState(false);
  const { isEdited } = useContext(UIContext);
  const Component = Blocks.get(block.name);
  useEffect(() => {
    setShouldRender(true);
  }, [])

  return (
    <StyledBlockContainer
      elevation={isEdited ? 4 : 0}
      square
      isPreview={isPreview}
    >
      {shouldRender ? <Component block={block} /> : null }
    </StyledBlockContainer>
  );
}

export default BlockContainer;
