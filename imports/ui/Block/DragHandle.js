import React from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import ActionButton from '/imports/ui/_components/ActionButton';

const StyledDragHandle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  float: 'left',
  marginLeft: '-48px',
  marginTop: '-48px'
})

const StyledDragIcon = styled(DragIndicatorIcon)({
  marginTop: '-12px',
  marginBottom: '-12px',
})

const DragHandle = ({ block, index, dragHandleProps, isLast }) => {
  return (
    <StyledDragHandle {...dragHandleProps}>
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
      <StyledDragIcon />
      <ActionButton
        name="changeOrder"
        defaultValue={{ direction: 'down' }}
        target={block}
        disableDialog
      >
        <IconButton
          aria-label="move down"
          disabled={isLast}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </ActionButton>
    </StyledDragHandle>
  )
}

export default DragHandle;
