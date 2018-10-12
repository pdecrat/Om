import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Blocks from '/imports/blocks/blocks-index';
import Data from '/imports/api/Data';

const Content = props => {
  const Component = Blocks[props.layout];

  return props.layout ? <Component /> : null;
}

const TrackedContent = withTracker(props => {
  const {
    target,
    hash,
  } = props;

  if (!target) return props;
  const view = Data.findOne({
    type: 'view',
    name: hash.length ? hash : target.name,
  });

  return {
    ...props,
    layout: view && view.layout,
  }
})(Content);

const mapStateToProps = state => ({
  target: state.target.doc,
  hash: state.target.hash
})
export default connect(mapStateToProps, null)(TrackedContent);
