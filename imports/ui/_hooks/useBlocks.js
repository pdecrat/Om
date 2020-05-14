import { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const orderBlocks = (blocks, orderByIds) => {
  const orderedBlocks = [];

  orderByIds.forEach(id => {
    const block = blocks.find(block => block._id === id);
    if (block)
      orderedBlocks.push(block)
  });
  return orderedBlocks;
}

const useBlocks = (query = {}, orderByIds = null) => {
  const { view } = useContext(ViewContext);

  const finalQuery = {
    root: view.root,
    viewId: view._id,
    ...query
  };
  const blocks = useTracker(() => {
    return Data.find(query).fetch();
  }, [view._id, view.order]);

  return orderByIds ? orderBlocks(blocks, orderByIds) : blocks;
}

export default useBlocks;
