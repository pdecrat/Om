
const SET_SPACE = 'om/space/set';

export function setSpace(space, category) {
  return {
    type: SET_SPACE,
    space,
    category
  }
}

const defaultState = {
  category: '',
  availableCategories: [],
  displayedBlocks: []
}

function space(state = defaultState, { type, space, category }) {
  switch (type) {
    case SET_SPACE:
      const availableCategories = [space.name];
      Object.keys(space.blocks)
        .forEach(key => {
          if (!availableCategories.includes(space.blocks[key].category)) {
            availableCategories.push(space.blocks[key].category)
          }
        })
      return {
        ...space,
        category,
        displayedBlocks: Object.keys(space.blocks)
          .filter(block => space.blocks[block].category === category
            || category === space.name)
          .map(block => {
            return {
              ...space.blocks[block],
              name: block,
            }
          }),
        availableCategories,
      };
      break;
    default:
      return state;
  }
}

export default space;
