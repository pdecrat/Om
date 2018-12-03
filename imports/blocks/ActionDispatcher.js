import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import { callAction } from '/imports/api/Actions';
import Block from '/imports/ui/_components/Block';

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
    return (
      <Block width={2} height={2}>
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
            this.props.dispatchCallAction(this.props.target, {
              name: this.state.name,
              data: this.state.data,
            })
          }}>
            Dispatch {this.state.name}
          </button>
        </StyledActionDispatcher>
      </Block>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchCallAction: (target, args) => dispatch(callAction(args.name, target, JSON.parse(args.data)))
});
const mapStateToProps = state => ({ target: state.target.doc });

export default connect(mapStateToProps, mapDispatchToProps)(ActionDispatcher);
