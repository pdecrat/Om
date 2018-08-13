import Spaces from '/imports/api/Spaces/Spaces';

const LOG_IN_USER = 'om/user/log-in';
const LOG_OUT_USER = 'om/user/log-out';
const SET_SHORTCUTS = 'om/user/set-shortcuts';

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

function setShortcuts(shortcuts) {
  return {
    type: SET_SHORTCUTS,
    shortcuts
  }
}

export function callSetShortcuts(names = []) {
  return dispatch => {
    const spaces = Spaces.find({ name: { $in: names } }).fetch() || [];

    return dispatch(setShortcuts(spaces));
  }
}

const defaultState = {
  doc: null,
  loggedIn: false,
  loggingIn: false,
  shortcuts: []
}

function user(state = defaultState, { type, user, shortcuts }) {
  switch (type) {
    case LOG_IN_USER:
      return {
        ...state,
        doc: user,
        loggedIn: true,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        doc: null,
        loggedIn: false,
      };
    case SET_SHORTCUTS:
      return {
        ...state,
        shortcuts
      }
    default:
      return state;
  }
}

export default user;
