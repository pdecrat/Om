import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('removeBlock', {
  fn({ target: { _id, root } }) {
    Data.remove({
      _id,
      root
    })
  }
})
