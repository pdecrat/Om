import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Draggable } from "react-beautiful-dnd";

import Block from '/imports/ui/Block/Block';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import ExpandableContainer from '/imports/ui/_components/ExpandableContainer';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledBlockHolder = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  display:'flex',
  flexDirection: 'column',
});

const BlockHolder = ({ block }) => {
  const { isEdited } = useContext(UIContext);

  return (
    <ExpandableContainer l={'20%'} r={'5%'} t={'48px'} b={0}>
      <Block block={block} />
    </ExpandableContainer>
  );
}

export default BlockHolder;
