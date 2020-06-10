import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { BlockContext } from '/imports/ui/_providers/BlockProvider';
import useCall from '/imports/ui/_hooks/useCall';

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

const DragHandle = ({ index, dragHandleProps, isLast }) => {
  const { block } = useContext(BlockContext);
  const target = {
    _id: block.viewId,
    root: block.root
  }
  const call = useCall('pushAtIndex', { toPush: block._id }, target);

  return (
    <StyledDragHandle {...dragHandleProps}>
      <IconButton
        aria-label="move up"
        disabled={index === 0}
        onClick={e => call({ index: index - 1 })}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <StyledDragIcon />
      <IconButton
        aria-label="move down"
        disabled={isLast}
        onClick={e => call({ index: index + 1 })}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </StyledDragHandle>
  )
}

export default DragHandle;
