import { push } from 'connected-react-router'

const SET_SPACE = 'om/space/set';

export function setSpace(space) {
  return {
    type: SET_SPACE,
    space
  }
}

export function callCreateSpace(space) {
  return dispatch => {
    Meteor.call('spaces.create', space, (err, res) => {
      if (!err) {
        dispatch(push(`/s/${space.name}`))
      }
    })
  }
}

function space(state = {}, action) {
  switch (action.type) {
    case SET_SPACE:
      return {
        ...action.space
      };
      break;
    default:
      return state;
  }
}

export default space;
