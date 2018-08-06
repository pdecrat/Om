const SET_BLOCKS = 'om/blocks/set'

export function setBlocks(blocks) {
  return {
    type: SET_BLOCKS,
    blocks
  }
}

const defaultState = [];

function blocks(state = defaultState, { type, blocks }) {
  switch (type) {
    case SET_BLOCKS:
      return blocks
    default:
      return state;
  }
}
export default blocks;
