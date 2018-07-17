import { Mongo } from 'meteor/mongo';

import { Collections } from '/imports/api/Collections';

const ADD_COLLECTION = 'om/collections/add';

export function addCollection(collection, handle) {
  return {
    collection,
    handle,
    type: ADD_COLLECTION
  }
}

export function callAddCollection(collection) {
  return dispatch => {
    if (!Collections[collection.name]) {
      const handle = new Mongo.Collection(collection.name);
      Collections[collection.name] = handle;
      dispatch(addCollection(collection, handle))
    }
  }
}

export function query(query, collection, callback) {
  return dispatch => {
    const result = Collections[collection].find(query).fetch();

    dispatch(callback(result));
  }
}

const defaultState = {
}

function collections(state = defaultState, action) {
  switch (action.type) {
    case ADD_COLLECTION:
      return {
        ...state,
        [action.collection.name]: action.handle
      };
    default:
      return state;
  }
}

export default collections
