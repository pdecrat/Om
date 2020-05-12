import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { InterfaceContext } from '/imports/ui/Interface';
import Blocks from '/imports/core/Blocks';
import useView from '/imports/ui/hooks/useView';
import useUI from '/imports/ui/hooks/useUI';
import useBlocks from '/imports/ui/hooks/useBlocks';

const StyledContent = styled(Box)({
  marginTop: '48px'
});
const StyledBlock = styled(({ isEdited, ...props }) => <Paper {...props} />)({
  transform: ({ isEdited }) => isEdited ? 'scale(0.9)' : 'scale(1)',
  transition: 'transform .2s ease-in-out'
});

const Content = () => {
  const history = useHistory()
  const view = useView();
  const { isEdited } = useContext(InterfaceContext);

  if (!view && (Meteor.isServer || isReady)) {
    history.replace('/not-found')
    return null;
  }
  const blocks = useBlocks();
  const renderBlocks = (block) => {
    const Component = Blocks.get(block.name);


    if (!Component) return null;
    return (
      <StyledBlock key={block._id} isEdited={isEdited}>
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
