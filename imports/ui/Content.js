import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Editable from '/imports/ui/_components/Editable';
import Block from '/imports/ui/_components/Block';
import useBlocks from '/imports/ui/_hooks/useBlocks';
import useView from '/imports/ui/_hooks/useView';

const Content = () => {
  const { order } = useView();
  const blocks = useBlocks({}, order);

  return (
    <React.Fragment>
      {blocks.map(block => <Block key={block._id} block={block} />)}
    </React.Fragment>
  );
}

export default Content;
