import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import { UIContext } from '/imports/ui/_providers/UIProvider';
import DragHandle from '/imports/ui/Block/DragHandle';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockToolbar = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  opacity: ({ isEdited }) => isEdited ? `0.9` : '0',
  transition: `opacity ${animationSpeed}`,
  display: 'flex',
  position: 'relative',
  float: 'left',
  minHeight: '48px',
  marginLeft: '-48px',
  marginTop: '-48px',
  alignItems: 'center',
})

const BlockToolbar = ({ block, index, dragHandleProps }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledBlockToolbar isEdited={isEdited}>
      <div {...dragHandleProps}>
        <DragHandle block={block} index={index} />
      </div>
      {block.label}
    </StyledBlockToolbar>
  )
}

export default BlockToolbar;
