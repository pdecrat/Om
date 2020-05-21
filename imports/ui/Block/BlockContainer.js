import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Draggable } from "react-beautiful-dnd";
import Slide from '@material-ui/core/Slide';

import Block from '/imports/ui/Block/Block';
import AddBlock from '/imports/ui/Block/AddBlock';
import BlockToolbar from '/imports/ui/Block/BlockToolbar';
import DragHandle from '/imports/ui/Block/DragHandle';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import BlockProvider from '/imports/ui/_providers/BlockProvider';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

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

const BlockContainer = ({ blockId, index, isLast, isDragged }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <BlockProvider blockId={blockId}>
      <Draggable
        key={blockId}
        draggableId={blockId}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => (
          <StyledBlockContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
              <AddBlock index={index} isDragged={isDragged} />
              <BlockToolbar />
              <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <DragHandle
                  dragHandleProps={provided.dragHandleProps}
                  index={index}
                  isLast={isLast}
                />
                <div style={{ flexGrow: 1 }}>
                  <Block />
                </div>
              </div>
          </StyledBlockContainer>
        )}
      </Draggable>
    </BlockProvider>
  );
}

export default BlockContainer;
