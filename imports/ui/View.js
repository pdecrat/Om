import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Content from '/imports/ui/Content/Content';
import ExpandableContainer from '/imports/ui/_components/ExpandableContainer';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import AppBar from '/imports/ui/AppBar/AppBar';

const StyledView = styled('div')({
  marginTop: '48px',
});

const View = () => {
  const { isEdited } = useContext(UIContext);

  return (
    <StyledView>
      <AppBar />
      <ExpandableContainer t={'48px'} l={'60px'}>
        <Content />
      </ExpandableContainer>
    </StyledView>
  )
}

export default View;
