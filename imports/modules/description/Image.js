import React from 'react';
import { Parallax } from 'react-parallax';

const Image = () => {
  return (
    <Parallax
        bgImage={'https://source.unsplash.com/random/800x600'}
        bgImageAlt="the cat"
        strength={400}
    >
        <div style={{ height: '600px' }} />
    </Parallax>
  )
}

export default Image;
