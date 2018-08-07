const SET_BLOCKS = 'om/blocks/set'
const SELECT_BLOCK = 'om/blocks/select'

export function setBlocks(blocks) {
  return {
    type: SET_BLOCKS,
    blocks
  }
}

export function selectBlock(block) {
  return {
    type: SELECT_BLOCK,
    block
  }
}

const defaultState = {
  list: [],
  selectedBlock: ''
};

function blocks(state = defaultState, { type, blocks, block }) {
  switch (type) {
    case SET_BLOCKS:
      return {
        list: blocks.map(block => block.name),
        selectedBlock: blocks[0].name
      }
    case SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: block
      }
    default:
      return state;
  }
}
export default blocks;
