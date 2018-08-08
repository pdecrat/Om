const LOG_IN_USER = 'om/user/log-in';
const LOG_OUT_USER = 'om/user/log-out';

export function logInUser(user) {
  return {
    type: LOG_IN_USER,
    user
  }
}

export function logOutUser() {
  return {
    type: LOG_OUT_USER,
  }
}

const defaultState = {
  doc: null,
  loggedIn: false,
  loggingIn: false,
}

function user(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        doc: action.user,
        loggedIn: true,
      };
      break;
    case LOG_OUT_USER:
      return {
        ...state,
        doc: null,
        loggedIn: false,
      };
      break;
    default:
      return state;
  }
}

export default user;
