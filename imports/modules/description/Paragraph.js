import React from 'react';
import Typography from '@material-ui/core/Typography';

const Paragraph = ({ data: { text = 'Hello World!' } }) => {
  return (
    <Typography>
      {text}
    </Typography>
  );
}

export default Paragraph;
