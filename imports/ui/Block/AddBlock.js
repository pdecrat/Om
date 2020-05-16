import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { useDrop } from 'react-dnd'
import { styled } from '@material-ui/core/styles';

import Blocks from '/imports/core/Blocks';
import Block from '/imports/ui/Block/Block';

const StyledAddBlock = styled(Box)({
  minHeight: '48px',
  alignItems:'center',
  textAlign: 'center'
})

const AddBlock = ({ index, isEdited }) => {
  const [{ isOver, item }, drop] = useDrop({
    accept:'content-block',
    drop: ({ target }) => {
      return ({ target, index })
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      item: mon.getItem()
    }),
  })

  return (
    <Collapse in={isEdited}>
      <div ref={drop}>
        {isOver ?
          <StyledAddBlock>
            <div>{index}</div>
          </StyledAddBlock>
          : null
        }
      </div>
    </Collapse>
  )
}

export default AddBlock;
