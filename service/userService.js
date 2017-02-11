const User = require('../models/User')
const APIError = require('../middlewares/rest').APIError;
const uuidV4 = require('uuid/v4');
var logedInUsers = require('../tokenRecord');

async function checkUserExisted(user){
  let userFound = await User.findAll({
    where: {
      $or:{
        username: user.username,
        email: user.email,
      }
    }
  })
  return userFound.length > 0 ? true:false;
}

module.exports = {
  logIn: async (username,password) => {
      let users = await User.findAll({
        where: {
          password: password,
          $or:{
            username: username,
            email: username,
          }
        }
      });
      console.log(`userService : ${users.length}`);
      var user = users[0];
      user.password = null;
      //todo remove id
      //user.id = 0;
      user['token'] = uuidV4();
      var logedInUserWithoutCurrentUser = logedInUsers.filter((logedInUser)=>{
         logedInUser != users[0].username;
      })
      logedInUserWithoutCurrentUser.push(
        {
          username:users[0].username,
          token:users[0].token,
          time:new Date().getTime()
        });

      logedInUsers = logedInUserWithoutCurrentUser
      console.log(JSON.stringify(logedInUsers[0]));
      return user;
    },

  register: async (user) => {
      if(checkUserExisted){
        throw new APIError('register:error','user already existed')
      }
      let userCreated = await User.create(user);
      return userCreated.id > -1 ? true:false;
    }
  }
