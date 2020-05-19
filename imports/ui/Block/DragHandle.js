import React from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import ActionButton from '/imports/ui/_components/ActionButton';

const StyledDragHandle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '-72px',
  float: 'left',
})

const DragHandle = ({ block, index }) => {
  return (
    <StyledDragHandle>
      <ActionButton
        name="changeOrder"
        defaultValue={{ direction: 'up' }}
        target={block}
        disableDialog
      >
        <IconButton
          aria-label="move up"
          disabled={index === 0 ? true : false}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </ActionButton>
      <DragHandleIcon />
      <ActionButton
        name="changeOrder"
        defaultValue={{ direction: 'down' }}
        target={block}
        disableDialog
      >
        <IconButton
          aria-label="move down"
          disabled={index < length - 1 ? false : true}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </ActionButton>
    </StyledDragHandle>
  )
}

export default DragHandle;
