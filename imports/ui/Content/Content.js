import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import BlockContainer from '/imports/ui/Block/BlockContainer';
import Block from '/imports/ui/Block/Block';
import useBlocks from '/imports/ui/_hooks/useBlocks';
import useCall from '/imports/ui/_hooks/useCall';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import EditModeSpacer from '/imports/ui/_components/EditModeSpacer';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const Content = () => {
  const call = useCall();
  const { view } = useContext(ViewContext);
  const { isReady } = useContext(Context);
  const { isEdited } = useContext(UIContext);
  const [ displayedOrder, setDisplayedOrder ] = useState(view.order)
  const [ draggedBlockId, setDraggedBlockId ] = useState('');

  useEffect(() => {
    setDisplayedOrder(view.order);
  }, [view.order])
  const beforeCapture = ({ draggableId }) => {
    setDraggedBlockId(draggableId)
  }
  const onDragEnd = ({ draggableId, destination, source }) => {
    const order = displayedOrder;
    order.splice(source.index, 1);
    order.splice(destination.index, 0, draggableId);
    setDisplayedOrder(order);
    setDraggedBlockId('')
    call({
      name: 'pushAtIndex',
      data: { index: destination.index, toPush: draggableId },
      target: { _id: view._id, root: view.root }
    });

  }

  return (
      <DragDropContext
        onBeforeCapture={beforeCapture}
        onDragEnd={onDragEnd}
      >
          <Droppable
            droppableId="content"
          >
            {(provided, snapshot) => (
              <StyledContent
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {displayedOrder.map((blockId, index) =>
                  <BlockContainer
                    isDragged={blockId === draggedBlockId}
                    index={index}
                    key={blockId}
                    blockId={blockId}
                    isLast={displayedOrder.length === index + 1}
                  />
                )}
                {provided.placeholder}
              </StyledContent>
            )}
          </Droppable>
      </DragDropContext>
  );
}

export default Content;
