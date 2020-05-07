import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SettingsIcon from '@material-ui/icons/Settings';

import '/imports/modules/admin/ViewsManager/effects/remove-block.js';
import '/imports/modules/admin/ViewsManager/effects/change-order.js';
import { Context } from '/imports/ui/ContextTracker';

const BlockItem = ({ block, index, length, isDisabled }) => {
  const { call } = useContext(Context);

  const removeBlock = () => {
    call({
      name: "removeBlock",
      target: block
    })
  }
  const changeOrder = (direction) => (() => {
    call({
      name: "changeOrder",
      data: { direction },
      target: block
    })
  })

  return (
    <ListItem style={{ paddingLeft: '40px' }} button dense key={block._id}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary={block.name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="move up"
          onClick={changeOrder('up')}
          disabled={index === 0 ? true : false}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="move down"
          onClick={changeOrder('down')}
          disabled={index < length - 1 ? false : true}
        >
          <ArrowDownwardIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={removeBlock}
          disabled={isDisabled && (block.name === 'ViewsManager')}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default BlockItem;
