import React from 'react';

import Editable from '/imports/ui/_components/Editable';
import Blocks from '/imports/core/Blocks';

const Block = ({ block }) => {
  const Component = Blocks.get(block.name);

  if (!Component) return null;
  return (
    <Editable key={block._id}>
      <Component block={block} />
    </Editable>
  )
}

export default Block;
