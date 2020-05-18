import React, { useContext, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import BlockHolder from '/imports/ui/Block/BlockHolder';
import Block from '/imports/ui/Block/Block';
import useBlocks from '/imports/ui/_hooks/useBlocks';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import EditModeSpacer from '/imports/ui/_components/EditModeSpacer';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledContent = styled(({ isEdited, ...props }) => <div {...props} />)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const Content = () => {
  const { view } = useContext(ViewContext);
  const { isReady } = useContext(Context);
  const { isEdited } = useContext(UIContext);
  const blocks = useBlocks({}, view.order);

  return (
      <DragDropContext onDragEnd={() => { console.log('hey') }}>
          <Droppable
            droppableId="content"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block._id}
                      draggableId={block._id}
                      index={index}
                      isDragDisabled={!isEdited}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <BlockHolder block={block} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
            )}
          </Droppable>
      </DragDropContext>
  );
}

export default Content;
