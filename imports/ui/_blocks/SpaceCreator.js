import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import { callAction } from '/imports/state/redux/action';
import Block from '/imports/ui/_components/Block';

const StyledSpaceCreator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between;
`

class SpaceCreator extends React.Component {

  state = {
    name: null
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
const toDispatch = (dispatch, res, { space }) => {
  dispatch(push(`/s/${space.name}`))
}

const mapDispatchToProps = dispatch => ({
  dispatchCreateSpace: space => dispatch(callAction('createSpace', null, { space }, toDispatch))
});

export default connect(null, mapDispatchToProps)(SpaceCreator);
