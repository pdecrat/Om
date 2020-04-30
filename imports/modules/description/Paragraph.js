import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const Paragraph = ({ data }) => {
  return (
    <ListItem>
      <Typography>
        {data.text}
      </Typography>
    </ListItem>
  );
}

export default Paragraph;
