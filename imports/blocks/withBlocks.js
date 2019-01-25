import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

const TrackedGrid = withTracker(props => {
  const {
    target,
    hash,
  } = props;
  if (!!target) {
    const query = {
      root: target._id,
      type: 'block',
      blockType: "content",
      view: { $in: [hash ? hash : target.name] },
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
  target: state.target.doc,
  hash: state.target.hash
})
const withBlocks = (component) =>
  connect(mapStateToProps, null)(TrackedGrid(component))
export default withBlocks;
