import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';

import Data from '/imports/core/Data';
import Blocks from '/imports/core/Blocks';
import ActionButton from '/imports/ui/_components/ActionButton';

import ViewItem from './ViewItem';

Blocks.register('ViewsManager', ({ block }) => {
  const views = useTracker(() => Data.find({
    root: block.root,
    type: 'view',
  }).fetch(), [block.root]);

  return (
    <List
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader variant="h4" id="nested-list-subheader">
          Vues
          <ActionButton name='addView'>
            <IconButton
              edge='end'
              aria-label="add-view"
              style={{ float: 'right' }}
            >
              <PostAdd />
            </IconButton>
          </ActionButton>
        </ListSubheader>
      }
    >
      {views.map(view =>
        <ViewItem key={view._id} view={view} isLast={views.length === 1} />
      )}
      <Divider />
    </List>
  );
});
