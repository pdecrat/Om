import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Blocks from '/imports/core/Blocks';
import Editable from '/imports/ui/_components/Editable';
import useView from '/imports/ui/_hooks/useView';
import useBlocks from '/imports/ui/_hooks/useBlocks';

const Content = () => {
  const history = useHistory()
  const view = useView();

  if (!view && (Meteor.isServer || isReady)) {
    history.replace('/not-found')
    return null;
  }
  const blocks = useBlocks();
  const renderBlocks = (block) => {
    const Component = Blocks.get(block.name);

    if (!Component) return null;
    return (
      <Editable key={block._id}>
        <Component block={block} />
      </Editable>
    )
  }

  return (
    <React.Fragment>
      {blocks.map(renderBlocks)}
    </React.Fragment>
  );
}

export default Content;
