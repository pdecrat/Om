import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import { clickLink } from '/imports/state/redux/ui/menu';

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
`

const SpaceMenu = ({ categories = [], dispatchClickLink, path }) =>
  <StyledSpaceMenu>
    {categories.map(category =>
      <StyledCategory
        key={category}
        onClick={e => { dispatchClickLink(`${path}#${category}`) }}
      >{category}</StyledCategory>
    )}
  </StyledSpaceMenu>

const mapStateToProps = state => ({
  categories: state.space.availableCategories,
  path: state.router.location.pathname,
});
const mapDispatchToProps = dispatch => ({
  dispatchClickLink: url => dispatch(clickLink(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceMenu);
