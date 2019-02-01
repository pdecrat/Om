import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Spaces from '/imports/api/Spaces/Spaces';
import { rem } from '/imports/ui/_lib/helpers-css';
import Link from '/imports/ui/_components/Link';

const StyledWrapper = styled.div`
  margin-top: ${rem('50px')};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: ${rem('300px')};
  display: flex;
  flex-direction: column;
  z-index: 9
`

const StyledSpaceList = styled.div`
  overflow-y: scroll;
`

const SpaceList = ({ spaces }) =>
  <StyledWrapper>
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
  </StyledWrapper>

const TrackedSpaceList = withTracker(props => {
  const {
    user,
    target,
  } = props;
  const spaces = user && Data.find({
    type: "shortcut"
  }).fetch()
  || [
  ];

  return {
    ...props,
    spaces,
  }
})(SpaceList);

const mapStateToProps = state => ({
  user: state.user.doc,
  context: state.context.doc
});

export default connect(mapStateToProps, null)(TrackedSpaceList);
