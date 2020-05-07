import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

const removeView = ({ target: { root, _id, isMainView } }) => {
  if (isMainView) {
    Data.update({ _id: { $ne: _id }, root, type: "view" }, { $set: { isMainView: true } });
  }
  Data.remove({
    root,
    $or: [
      { _id },
      { type: 'block', viewId: _id }
    ]
  })
}
Actions.registerEffect('removeView', removeView)
