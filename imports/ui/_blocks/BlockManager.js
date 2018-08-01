import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Block from '/imports/ui/_components/Block';
import { openModal } from '/imports/state/redux/ui/modal';
import ModalContent from '/imports/ui/Modal/ModalContent';
import { rem } from '/imports/ui/_lib/helpers-css';

const StyledBlockManager = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('15px')};
`

const StyledBlock = styled.div`
  width: 100%;
`

const BlockPicker = () =>
  <ModalContent>
    <select>
      <option>Hey</option>
      <option>Hey</option>
      <option>Hey</option>
    </select>
  </ModalContent>


const BlockManager = ({ blocks = [], dispatchOpenModal }) =>
  <Block width={1} height={4}>
    <StyledBlockManager>
      <h2>Current Blocks</h2>
      <ul>
        {blocks.map((block, index) => <StyledBlock key={index}>{block.name}</StyledBlock>)}
      </ul>
      <button onClick={e => { dispatchOpenModal(<BlockPicker />) }}>Add Block</button>
    </StyledBlockManager>
  </Block>

const mapStateToProps = ({ space }) => ({
  blocks: Object.keys(space.blocks)
    .map(block => {
      return {
        ...space.blocks[block],
        name: block,
      }
    })
})
const mapDispatchToProps = dispatch => ({
  dispatchOpenModal: content => dispatch(openModal(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockManager);
