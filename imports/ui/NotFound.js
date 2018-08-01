import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import { setSpace } from '/imports/state/redux/space';

const notFoundSpace = {
  name: "???",
  blocks: {}
}

const StyledNotFound = styled.div`
  height: 100vh;
  padding-top: ${rem('164px')};
  text-align: center;
  vertical-align: middle;
`

class NotFound extends React.Component {

  componentWillMount() {
    this.props.dispatchSpaceReset();
  }

  render() {
    return <StyledNotFound>Space not found (black hole ?)</StyledNotFound>
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSpaceReset: () => dispatch(setSpace(notFoundSpace, "???"))
});

export default connect(null, mapDispatchToProps)(NotFound);
