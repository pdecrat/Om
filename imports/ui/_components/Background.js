import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  display: block;
  position: fixed;
  z-index: ${props => props.zIndex};
  top: 0;
  left: 0;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  width: 100%;
  height: 100%;
  opacity: ${props => props.isOpen ? '0.1' : '0'};
  transition: opacity 0.4s;
  background-color: black;
`

const Background = props =>
  <StyledBackground
    onClick={e => { props.func() }}
    {...props}
  >
    {props.children}
  </StyledBackground>

export default Background;
