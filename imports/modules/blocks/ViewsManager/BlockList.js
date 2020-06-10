import React from 'react';
import List from '@material-ui/core/List';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ActionButton from '/imports/ui/_components/ActionButton';

import BlockItem from './BlockItem';

const BlockList = ({ view }) => {

  return (
    <List component="div" disablePadding>
      {view.order.map((blockId, index) =>
        <BlockItem
          key={index}
          blockId={blockId}
          index={index}
          length={view.order.length}
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
