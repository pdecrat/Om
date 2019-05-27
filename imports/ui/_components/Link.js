import React from 'react';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';

import { rem } from '/imports/ui/_lib/helpers-css';
import Avatar from '/imports/ui/_components/Avatar';

const StyledLink = styled.div`
  margin-top: ${rem('10px')};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  & > * {
    margin-left: ${rem('10px')}
  }
`

const Link = ({ url, label = null, history, object }) =>
  <StyledLink onClick={e => { history.push(url) }}>
    <Avatar
      size={36}
      object={object}
    />
    {
      !!label ?
        <p>{label}</p>
        : null
    }
  </StyledLink>

export default withRouter(Link);
