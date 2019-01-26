import { connect } from 'react-redux';

import { callAction } from '/imports/api/Actions';


const mapStateToProps = state => ({
  context: state.context.doc,
})

const mapDispatchToProps = dispatch => ({
  dispatchAction: (name, target, data, callback) => dispatch(callAction(name, target, data, callback))
});

const withContext = connect(mapStateToProps, mapDispatchToProps)

export default withContext;
