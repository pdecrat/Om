import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import withBlocks from '/imports/ui/_components/hoc/withBlocks';
import Blocks from '/imports/modules/blocks-index';

const StyledFullScreen = styled.div`
  & section {
    height: 100%;
  }
`

const FullScreen = ({ blocks }) => {
  const Component = Blocks[blocks[0].name];
  return !!Component ?
    <StyledFullScreen>
      <Component />
    </StyledFullScreen>
    : null;
 }
export default withBlocks(FullScreen);
