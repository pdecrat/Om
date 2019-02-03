import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledBreacrumbs = styled.div`
  margin-left: 10px;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Breadcrumbs = ({ match, query }) => {
  return (
    <StyledBreacrumbs>
      { match && match.params ?
          !!query.view ?
            query.view
            : match.params.spaceName
          : ''
      }
    </StyledBreacrumbs>
  )
}

export default Breadcrumbs;
