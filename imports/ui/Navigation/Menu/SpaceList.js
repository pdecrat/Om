import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import Image from '/imports/ui/_components/Image';

const StyledSpaceList = styled.div`
  width: ${rem('70px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  & > div {
    margin-top: ${rem('10px')};
  }
`

const SpaceList = ({ spaces }) =>
  <StyledSpaceList>
    {spaces && spaces.map(space =>
      <Image
        key={space}
        url='https://picsum.photos/420/?random'
        size={50}
      >
        {space}
      </Image>
    )}
  </StyledSpaceList>

const mapStateToProps = state => ({ spaces: state.user.spaces });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
