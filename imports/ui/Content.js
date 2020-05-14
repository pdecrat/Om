import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Editable from '/imports/ui/_components/Editable';
import Block from '/imports/ui/_components/Block';
import useBlocks from '/imports/ui/_hooks/useBlocks';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const Content = () => {
  const { view } = useContext(ViewContext);
  const blocks = useBlocks({  }, view.order);

  return (
    <React.Fragment>
      {blocks.map(block => <Block key={block._id} block={block} />)}
    </React.Fragment>
  );
}

export default Content;
