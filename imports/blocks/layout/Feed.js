import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Data from '/imports/api/Data';
import Blocks from '/imports/blocks/blocks-index';
import withBlocks from '/imports/ui/_components/hoc/withBlocks';

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Feed = ({ blocks = [] }) =>
  <StyledFeed>
    {blocks.map((block, index) => {
      const Component = Blocks[block.name];
      return !!Component && <Component key={index} data={block} />
    })}
  </StyledFeed>

export default withBlocks(Feed);
