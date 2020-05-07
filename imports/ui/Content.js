import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Container from '@material-ui/core/Container';

import Blocks from '/imports/modules/blocks-index';
import Data from '/imports/core/Data';
import { Context } from '/imports/ui/ContextTracker';


const Content = ({ layout, blocks }) => {
  const Component = Blocks[layout];

  return layout ?
    <Container
      disableGutters
      style={{ paddingTop: '48px' }}
    >
      <Component blocks={blocks} />
    </Container>
    : null;
}

export default TrackedContent = withTracker(props => {
  const history = useHistory()
  const { context, query, isReady } = useContext(Context);

  if (!context) return props;

  if (query.focus) {
    const block = Data.findOne(query.focus);

    return {
      ...props,
      layout: "FullScreen",
      blocks: [block]
    }
  }
  const viewQuery = query.view ? { name: query.view } : { isMainView: true };
  const view = Data.findOne({
    root: context._id,
    type: 'view',
    ...viewQuery
  });

  if (!view && (Meteor.isServer || isReady)) {
    history.push('/not-found')
    return;
  }

  const blocks = Data.find({
    root: context._id,
    type: 'block',
    blockType: "content",
    viewId: view._id,
  }, { sort: { viewOrder: 1 } }).fetch();

  // console.log("handle ready in TrackedContent ?")
  // console.log(isReady)

  return {
    ...props,
    layout: view && view.layout,
    blocks,
  }
})(Content);;
