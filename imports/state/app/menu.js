const TOGGLE_MENU = "om/app/menu/toggle";
const OPEN_MENU = "om/app/menu/open";
const CLOSE_MENU = "om/app/menu/close";

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
