import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('removeView', {
  fn({ target: { root, _id, isMainView } }) {
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
})
