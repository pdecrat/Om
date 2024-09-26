import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import ActionButton from '/imports/ui/_components/ActionButton';
import Data from '/imports/core/Data';
import useCall from '/imports/ui/_hooks/useCall';

const TodoItem = ({ todo }) => {
  const toggleStatus = useCall('toggleStatus', {}, todo);

  return (
    <ListItem
      key={value}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <CommentIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.isFinished}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}
