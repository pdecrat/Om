import React, { useContext } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import Spaces from '/imports/api/Spaces/Spaces';
import { rem } from '/imports/ui/_lib/helpers-css';
import Link from '/imports/ui/_components/Link';
import { UserContext } from '/imports/ui/UserTracker';

const StyledWrapper = styled.div`
  margin-top: ${rem('50px')};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  min-width: ${rem('50px')};
  display: flex;
  flex-direction: column;
  z-index: 9
`

const StyledSpaceList = styled.div`
  overflow-y: scroll;
`

const SpaceList = ({ spaces }) => spaces.length ?
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
  : null

const TrackedSpaceList = withTracker(props => {
  const {
    user,
  } = props;
  const spaces = user && Data.find({
    type: "shortcut"
  }).fetch() || [];

  return {
    ...props,
    spaces,
  }
})(SpaceList);

const ConnectedSpaceList = () => {
  const { user } = useContext(UserContext);
  return <TrackedSpaceList user />;
}
export default ConnectedSpaceList;
