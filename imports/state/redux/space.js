import { Meteor } from 'meteor/meteor';

import { Collections } from '/imports/api/Collections';

const SET_SPACE = "om/space/get";

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

const defaultState = {
  name: "",
  blocks: [],
  handle: null
}

function space(state = defaultState, action) {
  switch (action.type) {
    case SET_SPACE:
      return action.space
    default:
      return state;
  }
}

export default space;
