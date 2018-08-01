import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { clickLink } from '/imports/state/redux/ui/menu';
import { rem } from '/imports/ui/_lib/helpers-css';
import Image from '/imports/ui/_components/Image';

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

const Link = ({ url, label = null, dispatchClickLink }) =>
  <StyledLink onClick={e => { dispatchClickLink(url) }}>
    <Image
      url='https://picsum.photos/420/?random'
      size={50}
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
