const SET_SPACE = 'om/space/set';
const REMOVE_BLOCK = 'om/space/remove-block';
const SET_BLOCKS = 'om/space/set-blocks';

export function setSpace(space, category) {
  return {
    type: SET_SPACE,
    space,
    category,
  }
}

export function setBlocks(blocks) {
  return {
    type: SET_BLOCKS,
    blocks
  }
}

function getCategories(name, blocks) {
  const categories = [name];
  Object.keys(blocks)
    .forEach(key => {
      const blockCategory = blocks[key].category
      if (!!blockCategory.length && !categories.includes(blockCategory)) {
        categories.push(blockCategory)
      }
    })

  return categories;
}

function getDisplayedBlocks(blocks, name, category) {
  return Object.keys(blocks)
    .filter(block => blocks[block].category === category
      || category === name)
    .map(block => {
      return {
        ...blocks[block],
        name: block,
      }
    })
}

const defaultState = {
  category: '',
  availableCategories: [],
  displayedBlocks: [],
  doc: null,
  content: [],
  contentHandle: null,
}

function space(state = defaultState,
  {
    type,
    space,
    category,
    blocks,
  }) {
  switch (type) {
    case SET_SPACE:
      return {
        ...state,
        doc: space,
        category,
        displayedBlocks: getDisplayedBlocks(space.blocks, space.name, category),
        availableCategories: getCategories(space.name, space.blocks),
      };
      break;
    case SET_BLOCKS:
      return {
        ...state,
        doc: {
          ...state.doc,
          blocks
        },
        displayedBlocks: getDisplayedBlocks(blocks, state.doc.name, state.category),
        availableCategories: getCategories(state.doc.name, blocks),
      }
    default:
      return state;
  }
}

export default space;
