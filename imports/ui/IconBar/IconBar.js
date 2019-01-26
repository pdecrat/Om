import React from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { rem } from '/imports/ui/_lib/helpers-css';
import withContext from '/imports/ui/_components/hoc/withContext';
import Data from '/imports/api/Data';
import Blocks from '/imports/blocks/blocks-index';

const StyledIconBar = styled.ul`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
  align-items: center;
`

const IconBar = ({ icons }) =>
  <StyledIconBar>
    {icons.map((icon, index) => {
      const Component = Blocks[icon.name];
      return !!Component && <Component key={index} doc={icon}/>
    })}
  </StyledIconBar>

export default withContext(withTracker(props => {
  const icons = Data.find({
    root: props.context._id,
    type: "block",
    blockType: "user-icon",
  }).fetch()

  return {
    ...props,
    icons,
  }
})(IconBar));
