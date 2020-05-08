import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Container from '@material-ui/core/Container';

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
    history.push('/not-found')
    return null;
  }
  const Component = Blocks[view.layout];

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
    <Container
      disableGutters
      style={{ paddingTop: '48px' }}
    >
      <Component blocks={blocks} />
    </Container>
    : null;
}

export default Content;
