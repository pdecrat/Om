import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import Link from '/imports/ui/_components/Link';
import Scroller from '/imports/ui/_components/Scroller';

const StyledWrapper = styled.div`
  width: ${rem('70px')};
  display: flex;
  flex-direction: column;
`

const StyledSpaceList = styled.div`
`

const SpaceList = ({ spaces = [] }) =>
  <StyledWrapper>
    <Scroller bar={false}>
      <StyledSpaceList>
        {spaces.map((space, index) =>
          <Link
            key={index}
            url={`/s/${space}`}
          />
        )}
      </StyledSpaceList>
    </Scroller>
  </StyledWrapper>

const mapStateToProps = state => ({ spaces: state.user.spaces });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
