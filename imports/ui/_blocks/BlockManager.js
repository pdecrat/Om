import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { callAction } from '/imports/state/redux/action';
import { setBlocks, selectBlock } from '/imports/state/redux/blocks';
import Block from '/imports/ui/_components/Block';
import { openModal, closeModal } from '/imports/state/redux/ui/modal';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`

class BlockPicker extends React.Component {
  componentWillMount() {
    this.props.dispatchGetBlocks();
  }

  render() {
    const {
      dispatchSelectBlock,
      dispatchAddBlock,
      blocks,
      target,
    } = this.props;
    return (
      <ModalContent>
        <select onChange={e => { dispatchSelectBlock(e.target.value) }}>{
          blocks.list.map(block =>
            <option key={block} value={block}>{block}</option>
          )
        }
        </select>
        <button onClick={e => { dispatchAddBlock(blocks.selectedBlock, target) }}>Add {this.props.blocks.selectedBlock}</button>
      </ModalContent>
    )
  }
}
const dispatchAfterGetBlocks = (dispatch, res) => {
  if (res.blockList) {
    dispatch(setBlocks(res.blockList))
  }
}
const dispatchAfterAddBlock = (dispatch) => {
  dispatch(closeModal());
}
const BlockPickerMapState = state => ({
  blocks: state.blocks,
  target: state.space,
});
const BlockPickerMapDispatch = dispatch => ({
  dispatchGetBlocks: () => dispatch(callAction('getBlockList', null, {}, dispatchAfterGetBlocks)),
  dispatchSelectBlock: block => dispatch(selectBlock(block)),
  dispatchAddBlock: (name, target) => dispatch(callAction('addBlock', target, { name }, dispatchAfterAddBlock)),
})
const ConnectedBlockPicker = connect(BlockPickerMapState, BlockPickerMapDispatch)(BlockPicker);


const BlockManager = ({ blocks = [], dispatchOpenModal, dispatchRemoveBlock, space }) =>
  <Block width={1} height={4}>
    <StyledBlockManager>
      <h2>Current Blocks</h2>
      <ul>
        {blocks.map((block, index) =>
          <StyledBlock key={index}>
            {block.name}
            <button onClick={e => { dispatchRemoveBlock(block.name, space) }}>X</button>
          </StyledBlock>
        )}
      </ul>
      <button onClick={e => { dispatchOpenModal(<ConnectedBlockPicker />) }}>Add Block</button>
    </StyledBlockManager>
  </Block>

const mapStateToProps = ({ space }) => ({
  blocks: Object.keys(space.blocks)
    .map(block => {
      return {
        ...space.blocks[block],
        name: block,
      }
    }),
    space
})
const mapDispatchToProps = dispatch => ({
  dispatchOpenModal: content => dispatch(openModal(content)),
  dispatchRemoveBlock: (name, target) => dispatch(callAction('removeBlock', target, { name }, null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockManager);
