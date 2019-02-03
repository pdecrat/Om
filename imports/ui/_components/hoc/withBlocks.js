import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Data from '/imports/api/Data';

const blockTracker = withTracker(props => {
  const {
    context,
    queryParams,
  } = props;
  if (!!context) {
    const query = {
      root: context._id,
      type: 'block',
      blockType: "content",
      view: { $in: [queryParams.view ? queryParams.view : context.name] },
    };
    const blocks = Data.find(query).fetch() || [];
    return {
      ...props,
      blocks,
    }
  }
  return props
});

const mapStateToProps = state => ({
  context: state.context.doc,
  queryParams: state.context.query
})
const withBlocks = (component) =>
  connect(mapStateToProps, null)(blockTracker(component))
export default withBlocks;
