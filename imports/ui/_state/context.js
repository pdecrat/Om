const SET_CONTEXT = 'om/context/set';

export function setContext(context, query, match) {
  return {
    type: SET_CONTEXT,
    context,
    query,
    match,
  }
}

const defaultState = {
  doc: {},
  query: {},
  match: null,
}

function context(state = defaultState,
  {
    type,
    context,
    query,
    match,
  }) {
  switch (type) {
    case SET_CONTEXT:
      return {
        doc: context,
        query,
        match,
      };
      break;
    default:
      return state;
  }
}

export default context;
