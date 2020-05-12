import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Blocks from '/imports/core/Blocks';
import useView from '/imports/ui/hooks/useView';
import useBlocks from '/imports/ui/hooks/useBlocks';

const StyledContent = styled(Box)({
  marginTop: '48px'
});
const StyledBlock = styled(Paper)({
  transform: 'scale(0.9)',
  transition: 'transform .2s ease-in-out'
});

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
      <StyledBlock key={block._id} >
        <Component block={block} />
      </StyledBlock>
    )
  }

  return (
    <StyledContent>
      {blocks.map(renderBlocks)}
    </StyledContent>
  );
}

export default Content;
