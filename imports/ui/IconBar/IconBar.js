import React from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { rem } from '/imports/ui/_lib/helpers-css';
import Content from '/imports/api/Content';
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
      const Component = Blocks[icon.block];
      return !!Component && <Component key={index} doc={icon}/>
    })}
  </StyledIconBar>

export default withTracker(props => {
  const icons = Content.find({
    type: "block",
    blockType: "user-icon",
  }).fetch()

  return {
    ...props,
    icons,
  }
})(IconBar);
