import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import List from '@material-ui/core/List';

import BlockAdd from '/imports/modules/admin/ViewsManager/BlockAdd';
import BlockItem from '/imports/modules/admin/ViewsManager/BlockItem';

const BlockList = ({ viewId }) => {
  const blocks = useTracker(() => Data.find({
    type: 'block',
    viewId,
  }, { sort: { viewOrder: 1 } }).fetch(), [viewId]);
  const isViewManagerLast = useTracker(() => Data.find({
      type: 'block',
      name: 'ViewsManager'
    }).count() === 1, [blocks.length]);

  return (
    <List component="div" disablePadding>
      {blocks.map((block, index) =>
        <BlockItem
          key={index}
          block={block}
          index={index}
          length={blocks.length}
          isDisabled={isViewManagerLast}
        />
      )}
      <BlockAdd viewId={viewId} viewOrder={blocks.length} />
    </List>
  )
}

export default BlockList;
