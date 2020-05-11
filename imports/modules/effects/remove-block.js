import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('removeBlock', {
  fn({ target }) {
    Data.remove({
      _id: target._id,
      root: target.root
    })
    Data.update({ root: target.root, _id: target.viewId }, {
      $pull: { order: target._id }
    })
    target = null;
  }
})
