import React, { useContext } from 'react';
import { Parallax } from 'react-parallax';

import Blocks from '/imports/core/Blocks';
import { UIContext } from '/imports/ui/_providers/UIProvider';

Blocks.register('Image', () => {
  const { isEdited } = useContext(UIContext);

  return (
    <Parallax
        bgImage={'https://source.unsplash.com/random/800x600'}
        bgImageAlt="the cat"
        strength={300}
    >
        <div style={{ height: "400px" }} />
    </Parallax>
  )
});
