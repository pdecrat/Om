import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { rem } from '/imports/ui/_lib/helpers-css';
import { setContext } from '/imports/ui/_state/context';

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
  dispatchSpaceReset: () => dispatch(setContext(notFoundSpace, notFoundSpace.name))
});

export default connect(null, mapDispatchToProps)(NotFound);
