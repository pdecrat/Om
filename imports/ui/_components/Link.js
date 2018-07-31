import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

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

const Link = ({ space, dispatchGo }) =>
  <StyledLink onClick={e => { dispatchGo(`/s/${space}`) }}>
    <Image
      url='https://picsum.photos/420/?random'
      size={50}
    />
    <p>{space}</p>
  </StyledLink>

const mapDispatchToProps = dispatch => ({
  dispatchGo: link => dispatch(push(link))
});

export default connect(null, mapDispatchToProps)(Link);
