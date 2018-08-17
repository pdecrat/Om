import Spaces from '/imports/api/Spaces/Spaces';

const SET_USER = 'om/user/set-user';
const LOG_OUT_USER = 'om/user/log-out';
const SET_AS_LOGGING_IN = 'om/user/set-as-logging-in';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function logOutUser() {
  return {
    type: LOG_OUT_USER,
  }
}

export function setAsLoggingIn() {
  return {
    type: SET_AS_LOGGING_IN,
  }
}

const defaultState = {
  doc: null,
  loggedIn: false,
  loggingIn: false,
}

function user(state = defaultState, { type, user, shortcuts }) {
  switch (type) {
    case SET_USER:
      return {
        doc: user,
        loggedIn: true,
        loggingIn: false,
      };
    case LOG_OUT_USER:
      return {
        doc: null,
        loggedIn: false,
        loggingIn: false,
      };
    case SET_AS_LOGGING_IN:
      return {
        doc: null,
        loggedIn: false,
        loggingIn: true,
      };
    default:
      return state;
  }
}

export default user;
