import React, { useContext, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ContentLine from '/imports/ui/Content/ContentLine';
import AddBlock from '/imports/ui/Block/AddBlock';
import useBlocks from '/imports/ui/_hooks/useBlocks';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const animationSpeed = '330ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledContent = styled(({ isEdited, ...props }) => <div {...props} />)({
  transform: ({ isEdited }) => isEdited ? 'translateY(48px)' : 'translate(0)',
  transition: `transform ${animationSpeed}`,
  display: 'flex',
});
const StyledEditColumn = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  flex: ({ isEdited }) => isEdited ? '0 0 48px' : '0 0 0',
  transition: `flex ${animationSpeed}`,
});
const StyledContentColumn = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  flex: '1',
  transition: `flex ${animationSpeed}`,
  display: 'flex',
  flexDirection: 'column',
});

const Content = () => {
  const { view } = useContext(ViewContext);
  const { isReady } = useContext(Context);
  const { isEdited } = useContext(UIContext);
  const blocks = useBlocks({}, view.order);

  return (
    <StyledContent isEdited={isEdited}>
      <StyledEditColumn isEdited={isEdited} />
      <StyledContentColumn>
        {isReady && blocks.map((block, index) =>
          <ContentLine block={block} key={block._id} index={index} />
        )}
      </StyledContentColumn>
    </StyledContent>
  );
}

export default Content;
