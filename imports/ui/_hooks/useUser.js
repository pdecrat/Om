import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

const useUser = () => {
  const isUserRegistered = useTracker(() => !!Meteor.userId())
  const isLoggingIn = useTracker(() => Meteor.loggingIn());

  const isReady = useTracker(() => {
    if (isUserRegistered) {
      const handle = Meteor.subscribe('user-data')
      return handle.ready();
    } else return true;
  }, [isUserRegistered]);

  const user = useTracker(() => {
    if (isReady) return Meteor.user();
    return null;
  }, [isReady])

  // const register = (query) => {
  //   const history = useHistory();
  //   Accounts.callLoginMethod({
  //     methodArguments: [{
  //       'passwordless': {
  //         token: query.token
  //       }
  //     }],
  //     userCallback: function(err, res) {
  //       if (err) console.log(err);
  //       const { token, ...rest } = query;
  //       history.push(`${history.location.pathname}?${qs.stringify({ ...rest })}`)
  //     }
  //   });
// }

  return { isReady: (isReady && !isLoggingIn), user };
}

export default useUser;
