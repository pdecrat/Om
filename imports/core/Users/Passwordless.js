// import { Meteor } from 'meteor/meteor';
// import { Random } from 'meteor/random';
// import { Base64 } from 'meteor/ostrio:base64';
// import { Email } from 'meteor/email';
// import { check } from 'meteor/check';
//
// import { Collections } from '/imports/core/Collections';
//
// const {
//   login,
//   key,
//   hostname
// } = Meteor.settings.email;
// process.env.MAIL_URL = `smtp://${login}:${key}@${hostname}`;
// const appName = Meteor.settings.appName;
//
// const pendingCredentials = new Meteor.Collection('passwordless_pending_credentials');
//
// Passwordless = {};
//
// Passwordless.emailTemplates = {
//   sendLoginEmail: {
//     subject: `Your login link for ${appName}`,
//     text: function (url) {
//       return `You requested access to ${appName}.
// Please click on the following link to proceed
// ${url}
// Thank you !`;
//     }
//   }
// };
//
// Passwordless.sendLoginEmail = (email, url) => {
//   const token = Random.secret();
//   const loginUrl = Meteor.absoluteUrl(`${url}?token=${token}`);
//   const pendingCredential = pendingCredentials.findOne({ email });
//   const now = Date.now();
//
//   if (pendingCredential) {
//     /**
//       In case of existing pending credentials for this email, we check its
//       expiry date, and only proceed - by updating the existing one with the new
//       token - if it is expired.
//     **/
//     if (pendingCredential.when < (now - 3600000)) {
//       pendingCredentials.update(pendingCredential._id, {
//         $set: {
//           token,
//           when: now
//         }
//       });
//     } else {
//       throw new Meteor.Error('token-already-sent',
//         "You already requested access recently, please check your inbox"
//       );
//     }
//   } else {
//     pendingCredentials.insert({
//       email,
//       token,
//       when: now
//     });
//   }
//
//   Email.send({
//     to: email,
//     from: Meteor.settings.email.from,
//     subject: Passwordless.emailTemplates.sendLoginEmail.subject,
//     text: Passwordless.emailTemplates.sendLoginEmail.text(loginUrl),
//   });
//
// };
//
// Passwordless.verifyToken = ({ token }) => {
//   const pendingCredential = pendingCredentials.findOne({ token });
//   const now = Date.now();
//
//   if (!pendingCredential) {
//     throw new Meteor.Error('no-pending-credential',
//       "No pending credential was found for this email"
//     );
//   }
//
//   if (pendingCredential.when < (now - 3600000)) {
//     pendingCredentials.remove({ token });
//     throw new Meteor.Error('token-expired',
//       "You waited too long before using this token"
//     );
//   }
//   const serviceData = {
//     id: pendingCredential.email
//   };
//
//   pendingCredentials.remove({ token });
//
//   const { userId } = Accounts.updateOrCreateUserFromExternalService('passwordless', serviceData, {
//     email: pendingCredential.email
//   });
//
//   return {
//     userId,
//   };
// }
//
// Accounts.registerLoginHandler('passwordless', (options) => {
//   if (!options.passwordless)
//     return undefined;
//
//   check(options.passwordless, {
//     token: String,
//   });
//
//   return Passwordless.verifyToken(options.passwordless);
// });
//
// export default Passwordless;
