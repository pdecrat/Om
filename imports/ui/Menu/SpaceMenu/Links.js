import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { useHistory, useLocation } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import Data from '/imports/core/Data';
import { Context } from '/imports/ui/ContextTracker';

const isMainCategory = (path, category) => {
  const split = path.split('/')
  const space = split[split.length - 1];

  return space === category;
}

const SpaceMenu = ({ views = [], close }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <List style={{ minWidth:'240px' }} >
      {views.map((view, index) =>
        <ListItem
          button
          key={index}
          onClick={e => {
            history.push(`${location.pathname}?view=${view.name}`);
            close();
          }}
        >
          <ListItemText primary={view.name} />
        </ListItem>
      )}
    </List>
  )
}

export default ConnectedMenu = withTracker(props => {
  const { context } = useContext(Context);
  if (context && context._id) {
    const views = Data.find({
      root: context._id,
      type: "view",
    }).fetch();

    return {
      views,
      ...props
    }
  }
  return props;
})(SpaceMenu);
