import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Data from '/imports/api/Data';
import { rem } from '/imports/ui/_lib/helpers-css';
import { clickLink } from '/imports/ui/_state/ui/menu';

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
`

const StyledCategory = styled.div`
  width: 100%;
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

const SpaceMenu = ({ views = [], dispatchClickLink, path }) =>
  <StyledSpaceMenu>
    {views.map((view, index) =>
      <StyledCategory
        key={index}
        onClick={e => {
          dispatchClickLink(view.url.length ?
            `${path}#${view.url}` : path )
        }}
      >
        {view.name}
      </StyledCategory>
    )}
  </StyledSpaceMenu>

const TrackedMenu = withTracker(props => {
  if (props.target) {
    const views = Data.find({
      type: "view",
    }).fetch();

    return {
      views,
      ...props
    }
  }
  return props;
})(SpaceMenu)

const mapStateToProps = state => ({
  target: state.target.doc,
  path: state.router.location.pathname,
});
const mapDispatchToProps = dispatch => ({
  dispatchClickLink: url => dispatch(clickLink(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedMenu);
