import React from 'react';
import styled from 'styled-components';
import { User as Fuser } from 'react-feather';
import { connect } from 'react-redux';

import Avatar from '/imports/ui/_components/Avatar';
import { rem } from '/imports/ui/_lib/helpers-css';

const StyledUser = styled.li`
  margin-right: 5px;
  & > svg {
    border: 2px solid;
    border-radius: 50%;
  }
`

const User = ({ user }) =>
  <StyledUser>
    {user.name || user.avatar ?
      <Avatar object={user} size={40} />
      : null
    }
  </StyledUser>

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
