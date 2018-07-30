import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

const StyledImage = styled.div`
  background-image: url(${props => props.url});
  width: ${props => rem(props.size)};
  height: ${props => rem(props.size)};
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  background-color: rgb(47, 49, 54);
  text-align: center;
  color: #fff;
  line-height: ${rem('50px')};
`

const Image = ({ url, text, size }) =>
  <StyledImage url={url} size={size} />

export default Image;
