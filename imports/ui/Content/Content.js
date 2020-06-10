import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import BlockContainer from '/imports/ui/Block/BlockContainer';
import AddBlock from '/imports/ui/Block/AddBlock';
import useCall from '/imports/ui/_hooks/useCall';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import FlexSpacer from '/imports/ui/_components/FlexSpacer';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const Content = () => {
  const { view } = useContext(ViewContext);
  const call = useCall('pushAtIndex', {}, {
    _id: view._id, root: view.root
  });
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
    call({ index: destination.index, toPush: draggableId  });
  }

  return (
    <React.Fragment>
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
                <AddBlock index={displayedOrder.length} />
              </StyledContent>
            )}
          </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
}

export default Content;
