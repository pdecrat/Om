import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserPlus } from 'react-feather';
import { withRouter } from 'react-router-dom';

import ModalContent from '/imports/ui/Modal/ModalContent';
import { InterfaceContext } from '/imports/ui/Interface';
import Avatar from '/imports/ui/_components/Avatar';
import { rem } from '/imports/ui/_lib/helpers-css';
import { UserContext } from '/imports/ui/UserTracker';
import { Context } from '/imports/ui/ContextTracker';

const StyledUser = styled.li`
  margin-right: 5px;
  cursor: pointer;
  & > svg {
    border: 2px solid;
    border-radius: 50%;
  }
`

const RegisterForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const { context, call } = useContext(Context);
  const { closeModal } = useContext(InterfaceContext);
  function registerUser() {
    const name = 'register user';
    const data = { email, url: history.location.pathname };
    call({ name, data }, (err, res) => {
      if (!err) closeModal();
    })
  }

  return (
    <ModalContent>
      <input value={email} onChange={e => { setEmail(e.target.value) }}/>
      <button onClick={e => { registerUser() }}>Send Login Email</button>
    </ModalContent>
  )

}

const User = () => {
  const { user } = useContext(UserContext);
  const { openWithContent } = useContext(InterfaceContext);
  const Component = withRouter(RegisterForm);
  return (
    <StyledUser>
      {user ?
        <Avatar object={user} size={36} />
        : <UserPlus size={32} onClick={e => { openWithContent(<Component />) }}/>
      }
    </StyledUser>
  )
}

export default User;
