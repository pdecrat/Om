import React from 'react';

class Login extends React.Component {

  componentDidMount() {
    const credentials = this.props.match.params.credentials.split(':');

    Accounts.callLoginMethod({
      methodArguments: [{
        'passwordless': {
      		encodedEmail: credentials[0],
      		token: credentials[1]
        }
      }],
      userCallback: function(err, res) {
        if (err) console.log(err);
        else console.log(res);
      }
    });
  }

  render() {
    return (
      <header>
        Hello World !
      </header>
    );
  }
}

export default Login;
