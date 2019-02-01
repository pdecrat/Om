const SET_CONTEXT = 'om/context/set';

export function setContext(context, queryParams, match) {
  return {
    type: SET_CONTEXT,
    context,
    queryParams,
    match,
  }
}

const defaultState = {
  doc: {},
  queryParams: {},
  match: null,
}

function context(state = defaultState,
  {
    type,
    context,
    queryParams,
    match,
  }) {
  switch (type) {
    case SET_CONTEXT:
      return {
        doc: context,
        queryParams,
        match,
      };
      break;
    default:
      return state;
  }
}

export default context;
