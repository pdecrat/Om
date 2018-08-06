import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { callAction } from '/imports/state/redux/action';
import { setBlocks } from '/imports/state/redux/blocks';
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

class BlockPicker extends React.Component {

  componentWillMount() {
    this.props.dispatchGetBlocks();
  }

  render() {
    return (
      <ModalContent>
        <select>{
          this.props.blocks.map((block, index) =>
            <option key={index}>{block.name}</option>
          )
        }
        </select>
      </ModalContent>
    )
  }
}
const BlockPickerToDispatch = (dispatch, res) => {
  if (res.blockList) {
    dispatch(setBlocks(res.blockList))
  }
}
const BlockPickerMapState = state => ({ blocks: state.blocks });
const BlockPickerMapDispatch = dispatch => ({
  dispatchGetBlocks: () => dispatch(callAction('getBlockList', {}, BlockPickerToDispatch))
})
const ConnectedBlockPicker = connect(BlockPickerMapState, BlockPickerMapDispatch)(BlockPicker);


const BlockManager = ({ blocks = [], dispatchOpenModal }) =>
  <Block width={1} height={4}>
    <StyledBlockManager>
      <h2>Current Blocks</h2>
      <ul>
        {blocks.map((block, index) => <StyledBlock key={index}>{block.name}</StyledBlock>)}
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
    })
})
const mapDispatchToProps = dispatch => ({
  dispatchOpenModal: content => dispatch(openModal(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockManager);
