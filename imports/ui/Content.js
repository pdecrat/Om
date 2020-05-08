import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Blocks from '/imports/modules/blocks-index';
import Data from '/imports/core/Data';
import { Context } from '/imports/ui/ContextTracker';

const Content = () => {
  const history = useHistory()
  const { context, query, isReady } = useContext(Context);

  const view = useTracker(() => {
    const viewQuery = query.view ? { name: query.view } : { isMainView: true };

    return isReady ? Data.findOne({
      root: context._id,
      type: 'view',
      ...viewQuery
    }) : {};
  }, [query.view, isReady]);

  if (!view && (Meteor.isServer || isReady)) {
    history.replace('/not-found')
    return null;
  }
  const blocks = useTracker(() => {
    return isReady ? Data.find({
      root: context._id,
      type: 'block',
      blockType: "content",
      viewId: view._id,
    }, { sort: { viewOrder: 1 } }).fetch()
    : [];
  }, [isReady, view._id]);

  return isReady ?
    <React.Fragment>
      <div style={{ height: '48px' }} />
      {blocks.map((block, index) => {
        const Component = Blocks[block.name];
        return !!Component && <Component key={index} data={block} />
      })}
    </React.Fragment>
    : null;
}

export default Content;
