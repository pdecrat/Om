import { useDrag as dndUseDrag } from 'react-dnd'

import useCall from '/imports/ui/_hooks/useCall';

const useDrag = (block, isEdited, dragIndex) => {
  const call = useCall();

  return dndUseDrag({
    item: block,
    collect: monitor => ({
      isDragged: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (!result
        || result.dropIndex === dragIndex + 1
        || result.dropIndex === dragIndex
      ) return null;

      const index = dragIndex > result.dropIndex ? result.dropIndex : result.dropIndex - 1
      call({
        name: 'pushAtIndex',
        data: { index: index, toPush: block._id },
        target: { _id: block.viewId, root: block.root }
      }, (err, res) => { console.log(err) });
    },
    canDrag: () => isEdited
  })
}
export default useDrag;
