import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { UIContext } from '/imports/ui/_providers/UIProvider';
import BlockActionBar from '/imports/ui/Block/BlockActionBar';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockToolbar = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  opacity: ({ isEdited }) => isEdited ? `0.9` : '0',
  pointerEvents: ({ isEdited }) => isEdited ? `auto` : 'none',
  transition: `opacity ${animationSpeed}`,
  display: 'flex',
  position: 'relative',
  float: 'left',
  minHeight: '48px',
  marginTop: '-48px',
  alignItems: 'center',
})

const StyledDragHandle = styled('div')({
  display: "flex",
  alignItems: 'center',
})

const BlockToolbar = ({ block, index, isDragged }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledBlockToolbar isEdited={isEdited}>
      <StyledDragHandle>
        {block.label}
      </StyledDragHandle>
      <BlockActionBar block={block} />
    </StyledBlockToolbar>
  )
}

export default BlockToolbar;
