import React from 'react';
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

const BlockItem = ({ block, index, length, isDisabled }) => {
  return (
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
        <ActionButton
          name="changeOrder"
          defaultValue={{ direction: 'up' }}
          target={block}
          disableDialog
        >
          <IconButton
            edge="end"
            aria-label="move up"
            disabled={index === 0 ? true : false}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </ActionButton>
        <ActionButton
          name="changeOrder"
          defaultValue={{ direction: 'down' }}
          target={block}
          disableDialog
        >
          <IconButton
            edge="end"
            aria-label="move down"
            disabled={index < length - 1 ? false : true}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </ActionButton>
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
  )
}

export default BlockItem;
