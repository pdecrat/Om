import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import Link from '/imports/ui/_components/Link';
import Scroller from '/imports/ui/_components/Scroller';

const StyledSpaceList = styled.div`
  min-width: ${rem('70px')};
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SpaceList = ({ spaces = [] }) =>
  <Scroller>
    <StyledSpaceList>
      {spaces.map(space =>
        <Link key={space} space={space} />
      )}
    </StyledSpaceList>
  </Scroller>

const mapStateToProps = state => ({ spaces: state.user.spaces });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
