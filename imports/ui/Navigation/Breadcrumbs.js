import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const StyledBreacrumb = styled.li`
  margin-left: 15px;
  font-size: 1.4rem;
`;

const StyledBreacrumbs = styled.ul`
  display: flex;
  flex: 0 0 auto;
`;

const Breadcrumbs = () =>
  <StyledBreacrumbs>
    <StyledBreacrumb>Page title</StyledBreacrumb>
  </StyledBreacrumbs>

export default Breadcrumbs;
