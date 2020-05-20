import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Draggable } from "react-beautiful-dnd";
import Slide from '@material-ui/core/Slide';

import Block from '/imports/ui/Block/Block';
import BlockToolbar from '/imports/ui/Block/BlockToolbar';
import DragHandle from '/imports/ui/Block/DragHandle';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import EditModeSpacer from '/imports/ui/_components/EditModeSpacer';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

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

const BlockContainer = ({ block, index, isLast }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <Draggable
      key={block._id}
      draggableId={block._id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <StyledBlockContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <EditModeSpacer maxSize={'72px'} />
          <BlockToolbar
            block={block}
            index={index}
          />
          <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <DragHandle
              dragHandleProps={provided.dragHandleProps}
              block={block}
              index={index}
              isLast={isLast}
            />
            <div style={{ flexGrow: 1 }}>
              <Block block={block} />
            </div>
          </div>
        </StyledBlockContainer>
      )}
    </Draggable>
  );
}

export default BlockContainer;
