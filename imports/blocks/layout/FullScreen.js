import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Data from '/imports/api/Data';
import Blocks from '/imports/blocks/blocks-index';

const StyledFullScreen = styled.div`
  & section {
    height: 100%;
  }
`

const FullScreen = ({ block }) => {
  const Component = Blocks[block.name];
  return !!Component ?
    <StyledFullScreen>
      <Component />
    </StyledFullScreen>
    : null;
 }
const TrackedFullScreen = withTracker(props => {
  const {
    target,
    hash,
  } = props;
  if (!!target) {
    const query = {
      root: target._id,
      type: 'block',
      blockType: "content",
      view: { $in: [hash ? hash : target.name] },
    };
    const block = Data.findOne(query);
    return {
      ...props,
      block,
    }
  }
  return props
})(FullScreen);

const mapStateToProps = state => ({
  context: state.context.doc,
  hash: state.target.hash
})
export default connect(mapStateToProps, null)(TrackedFullScreen);
