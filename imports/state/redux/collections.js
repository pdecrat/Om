import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Collections } from '/imports/api/Collections';

const ADD_COLLECTION = 'om/collections/add';
const REMOVE_COLLECTION = 'om/collections/remove';

export function addCollection(name, handle) {
  return {
    name,
    handle,
    type: ADD_COLLECTION
  }
}

export function callAddCollection(name) {
  return dispatch => {
    if (!Collections[name]) {
      const handle = new Mongo.Collection(name);
      Collections[name] = handle;
      dispatch(addCollection(name, handle))
    }
  }
}

export function removeCollection(name) {
  return {
    name,
    type: REMOVE_COLLECTION
  }
}

export function callRemoveCollection(name) {
  return dispatch => {
    if (Collections[name]) {

      //remove minimongo collection

      Collections[name] = null;
      delete Collections[name];
      dispatch(removeCollection(name))
    }
  }
}

const defaultState = {
}

function collections(state = defaultState, action) {
  switch (action.type) {
    case ADD_COLLECTION:
      return {
        ...state,
        [action.name]: action.handle
      };
    case REMOVE_COLLECTION:
      const {
        [action.name]: dump,
        ...newState
      } = state;
      return newState;
    default:
      return state;
  }
}

export default collections
