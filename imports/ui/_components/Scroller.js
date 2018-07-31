import React from 'react';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

const Scroller = ({ children  }) =>
  <ReactIScroll
    iScroll={iScroll}
    options={{
      mouseWheel: true,
      scrollbars: true
    }}
  >
    {children}
  </ReactIScroll>

export default Scroller;
