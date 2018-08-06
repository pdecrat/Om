export function callAction(name, data = {}, toDispatch) {
  return dispatch => {
    Meteor.call('do', { name, data }, (err, res = {}) => {
      if (err) {
        // handle error
      } else {
        toDispatch(dispatch, res, data);
      }
    })
  }
}
