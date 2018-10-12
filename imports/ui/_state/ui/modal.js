const OPEN_MODAL = "om/ui/modal/open";
const CLOSE_MODAL = "om/ui/modal/close";

const defaultState = {
  open: false,
  content: ""
}

export function openModal(content) {
  return {
    type: OPEN_MODAL,
    content,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    content: "",
  }
}

function modal(state = defaultState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        content: action.content,
      };
    case CLOSE_MODAL:
      return defaultState;
    default:
      return state;
  }
}

export default modal;
