import React from 'react';
import List from '@material-ui/core/List';

import Blocks from '/imports/modules/blocks-index';

const Feed = ({ blocks = [] }) =>
  <List>
    {blocks.map((block, index) => {
      const Component = Blocks[block.name];
      return !!Component && <Component key={index} data={block} />
    })}
  </List>

export default Feed;
