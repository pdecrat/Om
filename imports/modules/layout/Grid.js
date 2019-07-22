import React from 'react';
import styled from 'styled-components';

import { media, rem } from '/imports/ui/_lib/helpers-css';
import Data from '/imports/core/Data';
import Block from '/imports/ui/_components/Block';
import Blocks from '/imports/modules/blocks-index';
import withBlocks from '/imports/ui/_components/hoc/withBlocks';

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  ${media.big`
    grid-template-columns: repeat(3, 1fr);
  `};
  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.small`
    grid-template-columns: repeat(1, 1fr);
  `}
  grid-auto-flow: dense;
  grid-auto-rows: ${rem('64px')};
`

const Grid = ({ blocks = [] }) =>
  <StyledGrid>
    {blocks.map((block, index) => {
      const Component = Blocks[block.name];
      return !!Component &&
        <Block width={block.width} height={block.height} key={index}>
          <Component data={block} />
        </Block>
    })}
  </StyledGrid>

export default withBlocks(Grid);
