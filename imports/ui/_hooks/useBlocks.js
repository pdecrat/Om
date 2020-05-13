import { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import useView from '/imports/ui/_hooks/useView';
import { Context } from '/imports/ui/_providers/ContextProvider';

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
  const { context, isReady } = useContext(Context);
  const view = useView();

  const finalQuery = {
    root: context._id,
    viewId: view._id,
    ...query
  };
  const blocks = useTracker(() => {
    return isReady ? Data.find(query).fetch() : [];
  }, [isReady, view._id, view.order]);

  return orderByIds ? orderBlocks(blocks, orderByIds) : blocks;
}

export default useBlocks;
