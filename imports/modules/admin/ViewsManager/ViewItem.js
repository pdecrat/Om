import React, { useState, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';

import BlockList from '/imports/modules/admin/ViewsManager/BlockList';
import ViewEdit from '/imports/modules/admin/ViewsManager/ViewEdit';

import '/imports/modules/admin/ViewsManager/effects/remove-view.js';
import { Context } from '/imports/ui/ContextTracker';

const ViewItem = ({ view, isLast }) => {
  const [isOpen, setOpen] = useState(true);
  const { call, query } = useContext(Context);

  const removeView = () => {
    call({
      name: 'removeView',
      target: view
    })
  }

  return (
    <React.Fragment>
      <Divider />
      <ListItem button onClick={e => setOpen(!isOpen)}>
        <ListItemIcon>
          { isOpen ? <ExpandLess /> : <ExpandMore /> }
        </ListItemIcon>
        <ListItemText primary={view.name} />
        <ListItemSecondaryAction>
          <ViewEdit {...view} />
          <IconButton
            edge="end"
            aria-label="comments"
            disabled={
              view.name === query.view
              || (view.isMainView && !query.view)
              || isLast}
            onClick={removeView}
          >
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <BlockList viewId={view._id} />
      </Collapse>
    </React.Fragment>
  );
}

export default ViewItem;
