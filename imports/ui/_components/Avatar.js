import React from 'react';
import styled from 'styled-components';

import Image from './Image';

const Avatar = ({ user }) =>
  <Image url={user.avatar} text={user.name} size={32} />

export default Avatar;
