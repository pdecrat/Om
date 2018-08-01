import React from 'react';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

const Scroller = ({ children, bar = true  }) =>
  <ReactIScroll
    iScroll={iScroll}
    options={{
      mouseWheel: true,
      scrollbars: bar
    }}
  >
    {children}
  </ReactIScroll>

export default Scroller;
