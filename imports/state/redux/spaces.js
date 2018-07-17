import { Mongo } from 'meteor/mongo';

import { Collections } from '/imports/api/Collections';
import { addCollection } from './collections';

const ADD_SPACE = 'om/spaces/add';

export function addSpace(space, handle) {
  return {
    space,
    handle,
    type: ADD_SPACE
  }
}

export function callAddSpace(space) {
  return dispatch => {
    if (!Collections[space.name]) {
      const handle = new Mongo.Collection(space.name);
      Collections[space.name] = handle;
      dispatch(addCollection(space, handle));
    }
  }
}

const defaultState = {
}

function spaces(state = defaultState, action) {
  switch (action.type) {
    case ADD_SPACE:
      return {
        ...state,
        [action.space.name]: action.handle
      };
    default:
      return state;
  }
}

export default spaces
