import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import List from '@material-ui/core/List';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ActionButton from '/imports/ui/_components/ActionButton';
import useBlocks from '/imports/ui/_hooks/useBlocks';

import BlockItem from './BlockItem';

const BlockList = ({ view }) => {
  const blocks = useBlocks(view);
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
