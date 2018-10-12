import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Data from '/imports/api/Data';
import Blocks from '/imports/blocks/blocks-index';

const StyledGrid = styled.div`
  height: 100vh;
  background-color: rgb(237, 239, 241);
  padding-top: ${rem('50px')};
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  ${media.big`
    grid-template-columns: repeat(3, 1fr);
  `};
  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.small`
    grid-template-columns: repeat(1, 1fr);
  `}
  grid-auto-flow: dense;
  grid-auto-rows: ${rem('64px')};
  overflow: scroll;
`

const Grid = ({ blocks = [] }) =>
  <StyledGrid>
    {blocks.map((block, index) => {
      const Component = Blocks[block.name];
      return !!Component && <Component key={index} />
    })}
  </StyledGrid>

const TrackedGrid = withTracker(props => {
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
    const blocks = Data.find(query).fetch() || [];
    return {
      ...props,
      blocks,
    }
  }
  return props
})(Grid);

const mapStateToProps = state => ({
  target: state.target.doc,
  hash: state.target.hash
})
export default connect(mapStateToProps, null)(TrackedGrid);
