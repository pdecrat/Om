import React, { useContext } from 'react';
import { Parallax } from 'react-parallax';

import Blocks from '/imports/core/Blocks';

Blocks.register('Image', ({ block }) => {

  return (
    <Parallax
        bgImage={'https://source.unsplash.com/random/800x600'}
        bgImageAlt="the cat"
        strength={300}
    >
        <div style={{ height: '600px' }} />
    </Parallax>
  )
});
