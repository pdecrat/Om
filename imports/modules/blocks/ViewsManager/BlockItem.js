import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SettingsIcon from '@material-ui/icons/Settings';

import ActionButton from '/imports/ui/_components/ActionButton';
import Data from '/imports/core/Data';
import useCall from '/imports/ui/_hooks/useCall';

const BlockItem = ({ blockId, index, length, isDisabled }) => {
  const block = useTracker(() => Data.findOne({ _id: blockId }));
  const callReorder = useCall('pushAtIndex', { toPush: blockId });

  return block ? (
    <ListItem style={{ paddingLeft: '40px' }} button dense key={block._id}>
      <ActionButton
        name={`edit${block.name}`}
        target={block}
        defaultValue={{ ...block }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
      </ActionButton>
      <ListItemText primary={block.label} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="move up"
          onClick={e => callReorder({ index: index - 1 }, null, {
            _id: block.viewId,
            root: block.root
          })}
          disabled={index === 0 ? true : false}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="move down"
          onClick={e => callReorder({ index: index + 1 }, null, {
            _id: block.viewId,
            root: block.root
          })}
          disabled={index < length - 1 ? false : true}
        >
          <ArrowDownwardIcon />
        </IconButton>
        <ActionButton
          name="removeBlock"
          target={block}
          disableDialog
        >
          <IconButton
            edge="end"
            aria-label="delete"
            disabled={isDisabled && (block.name === 'ViewsManager')}
          >
            <ClearIcon />
          </IconButton>
        </ActionButton>
      </ListItemSecondaryAction>
    </ListItem>
  ) : null;
}

export default BlockItem;
