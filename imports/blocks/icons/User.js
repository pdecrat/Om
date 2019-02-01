import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { UserPlus } from 'react-feather';
import { connect } from 'react-redux';

import { callAction } from '/imports/api/Actions';
import { openModal, closeModal } from '/imports/ui/_state/ui/modal';
import ModalContent from '/imports/ui/Modal/ModalContent';
import Avatar from '/imports/ui/_components/Avatar';
import { rem } from '/imports/ui/_lib/helpers-css';

const StyledUser = styled.li`
  margin-right: 5px;
  cursor: pointer;
  & > svg {
    border: 2px solid;
    border-radius: 50%;
  }
`

class Login extends React.Component {

  state = {
    email: ''
  }

  render() {
    const {
      email
    } = this.state;

    return (
      <ModalContent>
        <input value={email} onChange={e => { this.setState({ email: e.target.value }) }}/>
        <button onClick={e => { this.props.dispatchRegister(this.props.doc, email) }}>Send Login Email</button>
      </ModalContent>
    )
  }
}
const dispatchAfterRegister = dispatch => {
  dispatch(closeModal())
}
const LoginMapDispatch = dispatch => ({
  dispatchRegister: (target, email) => dispatch(callAction('register user', target, { email }, dispatchAfterRegister))
})
const ConnectedLogin = connect(null, LoginMapDispatch)(Login);

const User = ({ user, dispatchOpenModal, doc }) =>
  <StyledUser>
    {user ?
      <Avatar object={user} size={36} />
      : <UserPlus size={32} onClick={e => { dispatchOpenModal(<ConnectedLogin doc={doc} />) }}/>
    }
  </StyledUser>

const mapStateToProps = state => ({ user: state.user.doc });
const mapDispatchToProps = dispatch => ({
  dispatchOpenModal: content => dispatch(openModal(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);