import React from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledModuleList = styled.div`
  padding: ${rem('15px')};
  max-width: ${rem('740px')};
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StyledModuleElement = styled.div`
`

const ModuleList = () => {
  return (
    <StyledModuleList>
      Modules
    </StyledModuleList>
  )
}

const TrackedModuleList = withTracker(props => {
  return props
})(ModuleList);

export default TrackedModuleList;
