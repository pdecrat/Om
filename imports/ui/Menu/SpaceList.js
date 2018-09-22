import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Spaces from '/imports/api/Spaces/Spaces';
import { rem } from '/imports/ui/_lib/helpers-css';
import Link from '/imports/ui/_components/Link';
import Scroller from '/imports/ui/_components/Scroller';

const StyledWrapper = styled.div`
  width: ${rem('300px')};
  display: flex;
  flex-direction: column;
`

const StyledSpaceList = styled.div`
`

const SpaceList = ({ spaces }) =>
  <StyledWrapper>
    <Scroller bar={false}>
      <StyledSpaceList>
        {spaces.map((space, index) =>
          <Link
            key={index}
            url={`/s/${encodeURIComponent(space.name)}`}
            object={space}
            label={space.name}
          />
        )}
      </StyledSpaceList>
    </Scroller>
  </StyledWrapper>

const TrackedSpaceList = withTracker(props => {
  const {
    user,
    space,
  } = props;
  const spaces = user && Spaces.find({ name: { $in: user.spaces } }).fetch() || Spaces.find().fetch();

  return {
    ...props,
    spaces,
  }
})(SpaceList);

const mapStateToProps = state => ({
  user: state.user.doc,
  space: state.space.doc
});

export default connect(mapStateToProps, null)(TrackedSpaceList);
