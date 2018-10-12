const SET_TARGET = 'om/target/set';

export function setTarget(target, hash, match) {
  return {
    type: SET_TARGET,
    target,
    hash,
    match,
  }
}

const defaultState = {
  doc: null,
  hash: '',
  match: null,
}

function target(state = defaultState,
  {
    type,
    target,
    hash,
    match,
  }) {
  switch (type) {
    case SET_TARGET:
      return {
        doc: target,
        hash: hash.slice(1),
        match,
      };
      break;
    default:
      return state;
  }
}

export default target;
