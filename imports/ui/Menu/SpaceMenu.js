import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

const SpaceMenu = ({ categories = [], dispatchClickLink, path, location }) =>
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

const mapStateToProps = state => ({
  categories: state.space.availableCategories,
  path: state.router.location.pathname,
  location: state.router.location,
});
const mapDispatchToProps = dispatch => ({
  dispatchClickLink: url => dispatch(clickLink(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceMenu);
