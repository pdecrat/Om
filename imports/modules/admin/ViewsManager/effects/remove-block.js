import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

const removeBlock = ({ target: { _id, root } }) => {
  Data.remove({
    _id,
    root
  })
}
Actions.registerEffect('removeBlock', removeBlock)
