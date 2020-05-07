import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const Paragraph = ({ data: { text = 'Hello World!' } }) => {
  return (
    <ListItem>
      <Typography>
        {text}
      </Typography>
    </ListItem>
  );
}

export default Paragraph;
