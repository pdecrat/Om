import { Meteor } from 'meteor/meteor';

export const GET_SPACE = "om/app/space/get";

function getSpace(space) {
  return {
    space,
    type: GET_SPACE,
  }
}

export function callGetSpace(name) {
  return dispatch => Meteor.call('spaces.get', name, (err, result) => {
    if (err) {
      throw new Meteor.Error(err.message);
    } else {
      dispatch(getSpace(result));
    }
  });
}

const defaultState= {
  name: "",
  blocks: []
}

function space(state = defaultState, action) {
  switch (action.type) {
    case GET_SPACE:
      return action.space
    default:
      return state;
  }
}

export default space;
