const SET_CONTEXT = 'om/context/set';

export function setContext(context, hash, match) {
  return {
    type: SET_CONTEXT,
    context,
    hash,
    match,
  }
}

const defaultState = {
  doc: {},
  hash: '',
  match: null,
}

function context(state = defaultState,
  {
    type,
    context,
    hash,
    match,
  }) {
  switch (type) {
    case SET_CONTEXT:
      return {
        doc: context,
        hash: hash.slice(1),
        match,
      };
      break;
    default:
      return state;
  }
}

export default context;
