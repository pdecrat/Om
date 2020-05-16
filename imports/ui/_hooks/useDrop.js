import { useDrop as dndUseDrop } from 'react-dnd'

const useDrop = (dropIndex) => dndUseDrop({
  accept:'block',
  drop: () => {
    return ({ dropIndex })
  },
  collect: mon => ({
    isOver: !!mon.isOver(),
    item: mon.getItem(),
  }),
})


export default useDrop;
