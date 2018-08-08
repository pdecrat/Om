import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

import Image from './Image';

const StyledName = styled.div`
  background: #d9d9d9;
  border-radius: 50%;
  width: ${props => props.size ? rem(`${props.size}px`) : rem('32px') };
  height: ${props => props.size ? rem(`${props.size}px`) : rem('32px') };
  line-height: ${props => props.size ? rem(`${props.size}px`) : rem('32px') };
  text-align: center;
`

const Avatar = ({ object, size }) => object.avatar ?
  <Image url={object.avatar} size={size} />
  : <StyledName size={size}>
    {!!object.name ?
      `${object.name[0].toUpperCase()}${object.name[1] ?
        object.name[1]
        : ''
      }`
      : '??'
    }
  </StyledName>

export default Avatar;
