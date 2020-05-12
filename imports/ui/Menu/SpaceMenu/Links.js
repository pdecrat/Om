import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import useLinks from '/imports/ui/_hooks/useLinks';

const isMainCategory = (path, category) => {
  const split = path.split('/')
  const space = split[split.length - 1];

  return space === category;
}

const SpaceMenu = ({ views = [], close }) => {
  const history = useHistory();
  const links = useLinks();

  return (
    <List style={{ minWidth:'240px' }} >
      {links.map((view, index) =>
        <ListItem
          button
          key={index}
          onClick={e => {
            history.push(`${history.location.pathname}?view=${view.name}`);
            close();
          }}
        >
          <ListItemText primary={view.label} />
        </ListItem>
      )}
    </List>
  )
}

export default SpaceMenu;
