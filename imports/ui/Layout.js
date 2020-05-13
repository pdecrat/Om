import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import Blocks from '/imports/core/Blocks';
import { Context } from '/imports/ui/_providers/ContextProvider';

import HeadUpDisplay from '/imports/ui/HeadUpDisplay';

const StyledLayout = styled('div')({
  height: '100vh',
  backgroundColor: 'white'
});

const Layout = () => {
  const { view, context } = useContext(Context);
  const Component = Blocks.get(view.layout ? view.layout : context.layout);

  return (
    <StyledLayout>
      <HeadUpDisplay />
    </StyledLayout>
  )
}

export default Layout;
