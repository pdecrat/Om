import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import Block from '/imports/ui/Block/Block';
import DragPreview from '/imports/ui/_components/DragPreview';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import useDrag from '/imports/ui/_hooks/useDrag';
import useDrop from '/imports/ui/_hooks/useDrop';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledContentLine = styled(({ isEdited, ...rest }) => <div {...rest}/>)({
  flex: ({ isEdited }) => isEdited ? '0 0 48px' : '0 0 0',
  display: 'flex',
  transition: `flex ${animationSpeed}`,
  flexDirection: 'column'
})

const StyledDropZoneContainer = styled(({ isEdited, isOver, ...rest }) => <div {...rest}/>)({
  flex: ({ isOver, isEdited }) => {
    if (!isEdited && !isOver)
      return '0 0 0px';
    else if (isOver)
      return '0 0 96px';
    else if (isEdited)
      return '0 0 48px';
  },
  display: 'flex',
  transition: `flex ${animationSpeed}`,
  position: 'relative'
})

const StyledDropZone = styled('div')({
  flex: '1',
})

const ContentLine = ({ block, index }) => {
  const { isEdited } = useContext(UIContext);
  const [{ isDragged }, dragRef, prev] = useDrag(block, isEdited, index);
  const [{ isOver, item }, drop] = useDrop(index);

  console.log(item)
  return (
    <StyledContentLine isEdited={isEdited && !isDragged} >
      <StyledDropZoneContainer isEdited={isEdited && !isDragged} isOver={isOver}>
        <StyledDropZone ref={drop}>
          { isOver ?
            <Grow in={true} mountOnEnter>
              <Block block={item} isPreview />
            </Grow>
          : null
        }
        </StyledDropZone>
      </StyledDropZoneContainer>
      <div ref={dragRef}>
        { isDragged ? <DragPreview block={block} /> : <Block block={block} index={index} />}
      </div>
    </StyledContentLine>
  )
}

export default ContentLine;
