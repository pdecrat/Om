import React from 'react';
import Typography from '@material-ui/core/Typography';

import Blocks from '/imports/core/Blocks';

Blocks.register('Paragraph', ({ data: { text = 'Hello World!' } }) => {
  return (
    <Typography>
      {text}
    </Typography>
  );
});