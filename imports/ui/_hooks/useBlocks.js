import { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import useView from '/imports/ui/_hooks/useView';
import { Context } from '/imports/ui/_providers/ContextProvider';

const useBlocks = (view = null) => {
  const { context, isReady } = useContext(Context);
  view = view ? view : useView();

  const blocks = useTracker(() => {
    const orderedBlocks = [];
    const temp = Data.find({
      root: context._id,
      type: 'block',
      blockType: "content",
      viewId: view._id,
    }).fetch();
    view.order.forEach(id => {
      const block = temp.find(block => block._id === id);
      if (block)
        orderedBlocks.push(block)
    });
    return isReady ? orderedBlocks : [];
  }, [isReady, view._id, view.order]);

  return blocks;
}

export default useBlocks;
