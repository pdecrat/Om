import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import { UIContext } from '/imports/ui/_providers/UIProvider';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import ActionButton from '/imports/ui/_components/ActionButton';

const animationSpeed = '220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

const StyledAddBlockContainer = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  flex: ({ isEdited }) => isEdited ? `0 0 96px` : '0 0 0',
  transition: `flex ${animationSpeed}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent:  'center',
  alignItems: 'center'
});

const StyledAddBlock = styled(({ isEdited, ...rest }) => <div {...rest} />)({
  opacity: ({ isEdited }) => isEdited ? `0.9` : '0',
  transition: `opacity ${animationSpeed}`,
  float: 'left',
  marginTop: '-48px',
  height: '48px',
  display: 'flex',
  justifyContent:  'center',
  alignItems: 'center',
  width: '148px',
  cursor: 'pointer'
});

const StyledLine = styled('div')({
  height: '2px',
  width: '50px',
  backgroundColor: 'grey',
})

const AddBlock = ({ index, isDragged }) => {
  const { isEdited } = useContext(UIContext);
  const { view } = useContext(ViewContext);

  return (
    <StyledAddBlockContainer isEdited={isEdited}>
      <ActionButton
        name='addBlock'
        target={view}
        defaultValue={{ name: 'Paragraph', index }}
      >
        <StyledAddBlock isEdited={isEdited && !isDragged}>
          <StyledLine />
          <AddBoxOutlinedIcon />
          <StyledLine />
        </StyledAddBlock>
      </ActionButton>
    </StyledAddBlockContainer>
  )
}

export default AddBlock;
