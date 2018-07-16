import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import '/imports/ui/_lib/global-style';
import { media } from '/imports/ui/_lib/helpers-css';
import { callGetSpace } from '/imports/state/app/space';

import Grid from '/imports/ui/Grid';
import Navigation from '/imports/ui/Navigation/Navigation';
import Modal from '/imports/ui/Modal/Modal';

const StyledInterface = styled.div`
`

class Interface extends React.Component {

  componentWillMount() {
    this.props.dispatchGetSpace('Om');
  }

  render() {
    return (
      <StyledInterface>
        <Navigation />
        <Grid />
        <Modal />
      </StyledInterface>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetSpace: name => dispatch(callGetSpace(name)),
});

export default connect(null, mapDispatchToProps)(Interface);
