import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Data from '/imports/core/Data';
import Blocks from '/imports/modules/blocks-index';

const Grid = ({ blocks = [] }) =>
  <Box
    style={{
      display: 'grid',
      justifyContent: 'center',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }}
  >
    {blocks.map((block, index) => {
      const Component = Blocks[block.name];
      return !!Component &&
        <Paper key={index}>
          <Component data={block} />
        </Paper>
    })}
  </Box>

export default Grid;
