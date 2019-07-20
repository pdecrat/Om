import { withTracker } from 'meteor/react-meteor-data';

import { Context } from '/imports/ui/ContextTracker'
import Data from '/imports/core/Data';

const withBlocks = withTracker(props => {
  const {
    context,
    query,
  } = props;
  if (!!context) {
    if (query.focus) {
      const block = Data.findOne(query.focus)

      return {
        ...props,
        blocks: [block]
      }
    }
    const queryParams = {
      root: context._id,
      type: 'block',
      blockType: "content",
      view: { $in: [query.view ? query.view : context.name] },
    };
    const blocks = Data.find(queryParams).fetch() || [];
    return {
      ...props,
      blocks,
    }
  }
  return props
});
export default withBlocks;
