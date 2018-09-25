import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Content from '/imports/api/Content';
import Blocks from '/imports/blocks/blocks-index';

const StyledGrid = styled.div`
  height: 100vh;
  background-color: #ebebeb;
  padding-top: ${rem('64px')};
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
    space,
    hash,
  } = props;
  if (!!space) {
    const query = {
      parent: space.reference,
      type: 'block',
      category: hash.slice(1),
      isActive: true,
    };
    const blocks = Content.find(query).fetch() || [];
    return {
      ...props,
      blocks,
    }
  }
  return props
})(Grid);

const mapStateToProps = state => ({
  space: state.space.doc,
  hash: state.space.hash
})
export default connect(mapStateToProps, null)(TrackedGrid);
