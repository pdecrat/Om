import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Components from '/imports/ui/_blocks/_index';

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

const Grid = ({ space = {} }) =>
  <StyledGrid>
    {space.blocks && space.blocks.map(block => {
      const Component = Components[block];
      return <Component key={block} />
    })}
  </StyledGrid>

const mapStateToProps = state => ({ space: state.space });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
