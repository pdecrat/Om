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

import ActionButton from '/imports/ui/components/ActionButton';
import { Context } from '/imports/ui/ContextTracker';

import BlockList from './BlockList';

const ViewItem = ({ view, isLast }) => {
  const [isOpen, setOpen] = useState(true);
  const { query } = useContext(Context);

  return (
    <React.Fragment>
      <Divider />
      <ListItem button onClick={e => setOpen(!isOpen)}>
        <ListItemIcon>
          { isOpen ? <ExpandLess /> : <ExpandMore /> }
        </ListItemIcon>
        <ListItemText primary={view.label} />
        <ListItemSecondaryAction>
          <ActionButton
            name='editView'
            target={view}
            defaultValue={{ label: view.label }}
          >
            <IconButton
              edge='end'
              aria-label="edit-view"
            >
              <SettingsIcon />
            </IconButton>
          </ActionButton>
            <ActionButton
              name='removeView'
              target={view}
              disableDialog
            >
            <IconButton
              edge="end"
              aria-label="removeView"
              disabled={
                view.name === query.view
                || (view.isMainView && !query.view)
                || isLast}
            >
              <ClearIcon />
            </IconButton>
            </ActionButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <BlockList view={{ _id: view._id, root: view.root }} />
      </Collapse>
    </React.Fragment>
  );
}

export default ViewItem;
