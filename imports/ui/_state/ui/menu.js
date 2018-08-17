import { push } from 'connected-react-router';

const TOGGLE_MENU = "om/ui/menu/toggle";
const OPEN_MENU = "om/ui/menu/open";
const CLOSE_MENU = "om/ui/menu/close";

const defaultState = {
  open: false
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  }
}

export function openMenu() {
  return {
    type: OPEN_MENU,
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
    default:
      return state;
  }
}

export default menu;
