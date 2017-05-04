const uuidV4 = require('uuid/v4');

var logedInUsersInit = [];

module.exports = {
  logedInUsers:logedInUsersInit,
  // getUserByToken:(token)=>{
  //   console.log(`tokenRecord.js: token:${token}`);
  //   console.log(`logedInUsers:${JSON.stringify(logedInUsers)}`);
  //   for (user of logedInUsers) {
  //     if(user.token === token){
  //       console.log(`find user by token:${JSON.stringify(user)}`);
  //       return user.user;
  //     }
  //   }
  //   return null;
  // }
};
