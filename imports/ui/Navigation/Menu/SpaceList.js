import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledSpaceList = styled.ul`
  width: ${rem('70px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
`

const StyledSpace = styled.li`

  /* This image is 687 wide by 1024 tall, similar to your aspect ratio */
  background-image: url(${props => props.url});

  /* make a square container */
  width: 150px;
  height: 150px;

  /* fill the container, preserving aspect ratio, and cropping to fit */
  background-size: cover;

  /* center the image vertically and horizontally */
  background-position: top center;

  /* round the edges to a circle with border radius 1/2 container size */
  border-radius: 50%;
  width: ${rem('50px')};
  height: ${rem('50px')};
  background-color: rgb(47, 49, 54);
  text-align: center;
  color: #fff;
  line-height: ${rem('50px')};
  margin-top: ${rem('10px')};
`

const SpaceList = ({ spaces }) =>
  <StyledSpaceList>
    {spaces && spaces.map(space =>
      <StyledSpace
        key={space}
        url='https://picsum.photos/420/?random'
      >
        {space}
      </StyledSpace>
    )}
  </StyledSpaceList>

  const mapStateToProps = state => ({ spaces: state.user.spaces });
  const mapDispatchToProps = dispatch => ({
  });

  export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
