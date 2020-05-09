import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Data from '/imports/core/Data';
import Blocks from '/imports/core/Blocks';
import ViewItem from '/imports/modules/admin/ViewsManager/ViewItem';
import ViewAdd from '/imports/modules/admin/ViewsManager/ViewAdd';

Blocks.register('viewsManager', ({ data }) => {
  const views = useTracker(() => Data.find({
    root: data.root,
    type: 'view',
  }).fetch(), [data.root]);

  return (
    <List
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader variant="h4" id="nested-list-subheader">
          Vues
          <ViewAdd />
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
