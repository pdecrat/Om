import React from 'react';

import Blocks from '/imports/modules/blocks-index';

const FullScreen = ({ blocks = [] }) => {
  if (!blocks[0]) return null;
  const Component = Blocks[blocks[0].name];
  return !!Component ?
    <div>
      <Component data={blocks[0]} />
    </div>
    : null;
 }
export default FullScreen;
