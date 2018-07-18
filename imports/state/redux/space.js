import { Meteor } from 'meteor/meteor';

import { Collections } from '/imports/api/Collections';

const SET_SPACE = "om/space/get";
const UNSET_SPACE = "om/space/unset";

function setSpace(space) {
  return {
    space,
    type: SET_SPACE,
  }
}

export function callSetSpace(name) {
  return dispatch => {
    const result = Collections['spaces'].findOne({name});

    dispatch(setSpace(result));
  }
}

export function unsetSpace() {
  return {
    type: UNSET_SPACE,
  }
}

const defaultState = {
  name: "",
  blocks: [],
  handle: null
}

function space(state = defaultState, action) {
  switch (action.type) {
    case SET_SPACE:
      return action.space
    case UNSET_SPACE:
      return defaultState
    default:
      return state;
  }
}

export default space;
