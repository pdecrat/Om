import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Blocks from '/imports/core/Blocks';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { BlockContext } from '/imports/ui/_providers/BlockProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlock = styled(Paper)({
  overflowY: 'hidden',
  minHeight: '48px',
  transition: `box-shadow ${animationSpeed}`,
})

const Block = () => {
  const { isEdited } = useContext(UIContext);
  const { block } = useContext(BlockContext);
  const Component = Blocks.get(block.name);

  return (
    <StyledBlock
      elevation={isEdited ? 4 : 0}
      square
    >
      <Component block={block} />
    </StyledBlock>
  );
}

export default Block;
