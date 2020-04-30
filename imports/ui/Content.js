import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
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

const TrackedContent = withTracker(props => {
  const {
    context,
    query,
    history,
    isReady,
  } = props;

  if (!context) return props;

  if (query.focus) {
    const block = Data.findOne(query.focus);

    return {
      ...props,
      layout: "FullScreen",
      blocks: [block]
    }
  }
  const view = Data.findOne({
    root: context._id,
    type: 'view',
    name: query.view ? query.view : context.name,
  });
  const blocks = Data.find({
    root: context._id,
    type: 'block',
    blockType: "content",
    view: { $in: [query.view ? query.view : context.name] },
  }).fetch();

  // console.log("handle ready in TrackedContent ?")
  // console.log(isReady)
  if (!view && (Meteor.isServer || isReady)) {
    history.push('/not-found')
  }

  return {
    ...props,
    layout: view && view.layout,
    blocks,
  }
})(Content);

const ConnectedContent = withRouter(({ history }) => {
  const { context, query, isReady } = useContext(Context);

  // console.log("handle ready in ConnectedContent ?")
  // console.log(isReady)
  return isReady ? (
    <TrackedContent
      isReady={isReady}
      history={history}
      query={query}
      context={context}
    />
  )
  : null;
}
)

export default ConnectedContent;
