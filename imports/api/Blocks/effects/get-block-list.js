import Blocks from '/imports/api/Blocks/Blocks';
import Actions from '/imports/api/Actions';

const getBlockList = ({ target, response }) => {
  response.blockList = Blocks.find().fetch();
}
Actions.registerEffect('getBlockList', getBlockList);

Actions.add({
  name: 'getBlockList',
  effects: {
    getBlockList: true
  }
})
