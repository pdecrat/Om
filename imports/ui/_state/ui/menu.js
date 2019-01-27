import { push } from 'connected-react-router';

const TOGGLE_MENU = "om/ui/menu/toggle";
const OPEN_MENU = "om/ui/menu/open";
const CLOSE_MENU = "om/ui/menu/close";
const HIDE_MENU = "om/ui/menu/hide";
const SHOW_MENU = "om/ui/menu/show";

const defaultState = {
  open: false,
  hidden: false,
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  }
}

function open() {
  return {
    type: OPEN_MENU,
  }
}
export function openMenu() {
  return dispatch => {
    dispatch(showMenu())
    setTimeout(() => dispatch(open()), 250)

  }
}

export function hideMenu() {
  return {
    type: HIDE_MENU,
  }
}

export function showMenu() {
  return {
    type: SHOW_MENU,
  }
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  }
}

export function clickLink(url) {
  return dispatch => {
    dispatch(push(url));
    dispatch(closeMenu())
  }
}

function menu(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        open: !state.open,
      };
    case OPEN_MENU:
      return {
        ...state,
        open: true,
      };
    case CLOSE_MENU:
      return {
        ...state,
        open: false
      };
    case HIDE_MENU:
      return {
        ...state,
        hidden: true,
      };
    case SHOW_MENU:
      return {
        ...state,
        hidden: false,
      };
    default:
      return state;
  }
}

export default menu;
