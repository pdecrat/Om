export function callAction(name, target = null, data = {}, toDispatch) {
  const args = {
    target: target ? {
      _id: target._id,
      type: target.type,
    } : target,
    data,
    name,
  }
  return dispatch => {
    Meteor.call('do', args, (err, res = {}) => {
      if (err) {
        // handle error
      } else if (!!toDispatch) {
        toDispatch(dispatch, res, data);
      }
    })
  }
}
