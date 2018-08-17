import React from 'react';
import styled from 'styled-components';

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

const Breadcrumbs = ({ match = {}, hash }) =>
  <StyledBreacrumbs>
    <StyledBreacrumb>{
      match.params ?
        `${match.params.spaceName}${!!hash.length ? ` > ${hash.slice(1)}` : ''}`
      : ''
    }</StyledBreacrumb>
  </StyledBreacrumbs>

export default Breadcrumbs;
