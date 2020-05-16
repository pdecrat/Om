import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import Block from '/imports/ui/Block/Block';

import useMousePosition from '/imports/ui/_hooks/useMousePosition';

const StyledPreview = styled('div')({
})
const DragPreview = ({ block }) => {
  const mouse = useMousePosition();
  const pointerRef = useRef();

  useLayoutEffect(() => {
    pointerRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y + window.scrollY}px)`
  }, [mouse])

  return (
    <div ref={pointerRef}>
      <Grow in={true} mountOnEnter>
        <Block block={block} isPreview />
      </Grow>
    </div>
  )
}

export default DragPreview;
