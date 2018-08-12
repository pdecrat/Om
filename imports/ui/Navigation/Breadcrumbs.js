import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledBreacrumb = styled.li`
  margin-left: 15px;
  font-size: 1.4rem;
  text-transform: capitalize;
`;

const StyledBreacrumbs = styled.ul`
  display: flex;
  flex: 0 0 auto;
`;

const Breadcrumbs = ({ space }) => space ?
  <StyledBreacrumbs>
    <StyledBreacrumb>{space.name}</StyledBreacrumb>
  </StyledBreacrumbs>
  : null

const mapStateToProps = state => ({ space: state.space.doc });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
