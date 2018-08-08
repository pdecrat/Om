import Spaces from '/imports/api/Spaces/Spaces';

const SET_SPACES = 'om/spaces/set'

function setSpaces(spaces) {
  return {
    type: SET_SPACES,
    spaces
  }
}

export function callSetSpaces(names = []) {
  return dispatch => {
    const spaces = Spaces.find({ name: { $in: names } }).fetch() || [];

    return dispatch(setSpaces(spaces));
  }
}

const defaultState = [];

function spaces(state = defaultState, { type, spaces }) {
  switch (type) {
    case SET_SPACES:
      return spaces
    default:
      return state;
  }
}
export default spaces;
