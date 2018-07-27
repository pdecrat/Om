const SET_USER = 'om/user/set';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.user
      };
      break;
    default:
      return state;
  }
}

export default user;
