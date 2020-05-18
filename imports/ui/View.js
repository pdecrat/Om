import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Content from '/imports/ui/Content/Content';
import ExpandableContainer from '/imports/ui/_components/ExpandableContainer';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const StyledView = styled(Paper)({
  marginTop: '48px',
});

const View = () => {
  const { isEdited } = useContext(UIContext);

  return (
    <ExpandableContainer>
      <StyledView elevation={isEdited ? 2 : 0} >
        <ExpandableContainer t={'48px'}>
          <Content />
        </ExpandableContainer>
      </StyledView>
    </ExpandableContainer>
  )
}

export default View;
