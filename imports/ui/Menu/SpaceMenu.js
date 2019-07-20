import React, { useContext } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import Data from '/imports/core/Data';
import { rem } from '/imports/ui/_lib/helpers-css';
import { Context } from '/imports/ui/ContextTracker';
import { InterfaceContext } from '/imports/ui/Interface'

const StyledSpaceMenu = styled.div`
  border-radius: 3px 0 0 0;
  margin-top: ${rem('50px')};
  position: absolute;
  top: 0;
  right: 0;
  width: ${rem('250px')};
  background-color: rgb(246, 246, 246);
  height: 100%;
  z-index: 10;
  overflow-y: scroll;
`

const StyledCategory = styled.div`
  width: ${rem('220px')};
  font-size: 1.1rem;
  margin: ${rem('15px')};
  cursor: pointer;
  text-transform: capitalize;
`

const isMainCategory = (path, category) => {
  const split = path.split('/')
  const space = split[split.length - 1];

  return space === category;
}

const SpaceMenu = ({ views = [], history }) => {
  const { openMenu } = useContext(InterfaceContext);

  return (
    <StyledSpaceMenu>
      {views.map((view, index) =>
        <StyledCategory
          key={index}
          onClick={e => {
            history.push(view.url.length ?
              `${history.location.pathname}?view=${view.url}` : history.location.pathname )
            openMenu(false);
          }}
        >
          {view.name}
        </StyledCategory>
      )}
    </StyledSpaceMenu>
  )
}

const TrackedMenu = withRouter(withTracker(props => {
  if (props.context && props.context._id) {
    const views = Data.find({
      root: props.context._id,
      type: "view",
    }).fetch();

    return {
      views,
      ...props
    }
  }
  return props;
})(SpaceMenu))

const ConnectedMenu = () => {
  const { context } = useContext(Context);

  return <TrackedMenu context={context} />
}

export default ConnectedMenu;
