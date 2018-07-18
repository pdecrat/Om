const SET_USER = "om/user/set";
const UNSET_USER = "om/user/unset";

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function unsetUser() {
  return {
    type: UNSET_USER,
  }
}

const defaultState = {
}

function user(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UNSET_USER:
      return defaultState;
    default:
      return state;
  }
}

export default user;
