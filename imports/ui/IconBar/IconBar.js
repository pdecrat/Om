import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '/imports/ui/ContextTracker'
import { withTracker } from 'meteor/react-meteor-data';

import { rem } from '/imports/ui/_lib/helpers-css';
import Data from '/imports/api/Data';
import Blocks from '/imports/blocks/blocks-index';

const StyledIconBar = styled.ul`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
  align-items: center;
`

const IconBar = ({ icons = [] }) =>
  <StyledIconBar>
    {icons.map((icon, index) => {
      const Component = Blocks[icon.name];
      return !!Component && <Component key={index} doc={icon}/>
    })}
  </StyledIconBar>

const TrackedIcons = withTracker(props => {
  if (props.context && props.context._id) {
    const icons = Data.find({
      root: props.context._id,
      type: "block",
      blockType: "user-icon",
    }).fetch()

    return {
      ...props,
      icons,
    }
  }
  return props;
})(IconBar);

const Icons = props => {
  const { context, query } = useContext(Context);
  return <TrackedIcons {...props} query={query} context={context} />
}

export default Icons
