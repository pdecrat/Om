import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Blocks from '/imports/core/Blocks';

Blocks.register('Paragraph', ({ block: { text = 'Hello World!' } }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="body1">
        {text}
      </Typography>
    </Container>
  );
});
