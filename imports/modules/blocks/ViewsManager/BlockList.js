import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import List from '@material-ui/core/List';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ActionButton from '/imports/ui/components/ActionButton';

import BlockItem from './BlockItem';

const BlockList = ({ view }) => {
  const blocks = useTracker(() => Data.find({
    type: 'block',
    viewId: view._id,
  }, { sort: { viewOrder: 1 } }).fetch(), [view._id]);
  const isViewManagerLast = useTracker(() => Data.find({
      type: 'block',
      name: 'ViewsManager'
    }).count() === 1, [blocks.length]);

  return (
    <List component="div" disablePadding>
      {blocks.map((block, index) =>
        <BlockItem
          key={index}
          block={block}
          index={index}
          length={blocks.length}
          isDisabled={isViewManagerLast}
        />
      )}
      <ActionButton
        name='addBlock'
        target={view}
        defaultValue={{ name: 'Paragraph' }}
      >
        <ListItem
          style={{ paddingLeft: '40px' }}
          button
          dense
        >
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary="Ajouter un bloc" />
        </ListItem>
      </ActionButton>
    </List>
  )
}

export default BlockList;
