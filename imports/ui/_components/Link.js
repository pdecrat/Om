import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { clickLink } from '/imports/ui/_state/ui/menu';
import { rem } from '/imports/ui/_lib/helpers-css';
import Avatar from '/imports/ui/_components/Avatar';

const StyledLink = styled.div`
  margin-top: ${rem('10px')};
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  & > * {
    margin-left: ${rem('10px')}
  }
`

const Link = ({ url, label = null, dispatchClickLink, object }) =>
  <StyledLink onClick={e => { dispatchClickLink(url) }}>
    <Avatar
      size={50}
      object={object}
    />
    {
      !!label ?
        <p>{label}</p>
        : null
    }
  </StyledLink>

const mapDispatchToProps = dispatch => ({
  dispatchClickLink: link => dispatch(clickLink(link))
});

export default connect(null, mapDispatchToProps)(Link);
