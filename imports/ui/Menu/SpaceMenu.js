import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Content from '/imports/api/Content';
import { rem } from '/imports/ui/_lib/helpers-css';
import { clickLink } from '/imports/ui/_state/ui/menu';

const StyledSpaceMenu = styled.div`
  flex-grow: 1;
  background-color: #2f3136;
  width: ${rem('230px')};
`

const StyledCategory = styled.div`
  width: 100%;
  color: white;
  font-size: 140%;
  margin: ${rem('15px')};
  cursor: pointer;
  text-transform: capitalize;
`

const isMainCategory = (path, category) => {
  const split = path.split('/')
  const space = split[split.length - 1];

  return space === category;
}

const SpaceMenu = ({ categories = [], dispatchClickLink, path }) =>
  <StyledSpaceMenu>
    {categories.map((category, index) =>
      <StyledCategory
        key={index}
        onClick={e => {
          dispatchClickLink(isMainCategory(path, category) ?
          path : `${path}#${category}`)
        }}
      >
        {category}
      </StyledCategory>
    )}
  </StyledSpaceMenu>

const TrackedMenu = withTracker(props => {
  if (props.space) {
    const categories = [props.space.name];

    Content.find({
      type: 'block',
    }).forEach(({ category }) => {
      if (categories.indexOf(category) === -1) {
        categories.push(category)
      }
    });
    return {
      categories,
      ...props
    }
  }
  return props;
})(SpaceMenu)

const mapStateToProps = state => ({
  space: state.space.doc,
  path: state.router.location.pathname,
});
const mapDispatchToProps = dispatch => ({
  dispatchClickLink: url => dispatch(clickLink(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedMenu);
