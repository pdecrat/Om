const SET_SPACE = 'om/space/set';

export function setSpace(space, hash) {
  return {
    type: SET_SPACE,
    space,
    hash,
  }
}

const defaultState = {
  doc: null,
  hash: '',
  match: null,
}

function space(state = defaultState,
  {
    type,
    space,
    hash,
    match,
  }) {
  switch (type) {
    case SET_SPACE:
      return {
        doc: space,
        hash,
        match,
      };
      break;
    default:
      return state;
  }
}

export default space;
