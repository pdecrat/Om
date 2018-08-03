import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { callCreateSpace } from '/imports/state/redux/space';
import Block from '/imports/ui/_components/Block';

const StyledSpaceCreator = styled.div`
  display: flex;
  flex-direction: column;
`

class SpaceCreator extends React.Component {

  state = {
    name: ''
  }
  render() {
    return (
      <Block width={2} height={2}>
        <StyledSpaceCreator>
          <h2>Create a new Space</h2>
          <input onChange={e => {
            this.setState({
              name: e.target.value
            })
          }}/>
          <button onClick={e => {
            this.props.dispatchCreateSpace({ name: this.state.name })
          }}>
            Create {this.state.name}
          </button>
        </StyledSpaceCreator>
      </Block>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchCreateSpace: space => dispatch(callCreateSpace(space))
});

export default connect(null, mapDispatchToProps)(SpaceCreator);
