import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import { callAction } from '/imports/api/Actions';
import withContext from '/imports/ui/_components/hoc/withContext';

const StyledActionDispatcher = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between;
`

class ActionDispatcher extends React.Component {

  state = {
    name: null,
    data: null,
  }
  render() {
    const {
      name,
      data
    } = this.state;
    const {
      context,
      dispatchAction
    } = this.props;

    return (
      <StyledActionDispatcher>
        <h2>Dispatch action</h2>
        <input onChange={e => {
          this.setState({
            name: e.target.value
          })
        }}/>
        <textarea onChange={e => {
          this.setState({
            data: e.target.value
          })
        }}/>
        <button onClick={e => {
          dispatchAction(name, context, JSON.parse(data))
        }}>
          Dispatch {this.state.name}
        </button>
      </StyledActionDispatcher>
    )
  }
}

export default withContext(ActionDispatcher);
