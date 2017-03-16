const User = require('../models/User')
const APIError = require('../middlewares/rest').APIError;
const uuidV4 = require('uuid/v4');

var tokenRecord = require('../tokenRecord');

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

async function findUserById(userId){
  let userFound = await User.findAll({
    where: {
      id:userId
    }
  })
  return userFound;
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
      if(user == null){
        return null;
      }
      user.password = null;
      //todo remove id
      //user.id = 0;
      user['token'] = uuidV4();
      var logedInUserWithoutCurrentUser = tokenRecord.logedInUsers.filter((logedInUser)=>{
         logedInUser != users[0].username;
      })
      logedInUserWithoutCurrentUser.push(
        {
          user:user,
          token:user.token,
          time:new Date().getTime()
        });

      tokenRecord.logedInUsers = logedInUserWithoutCurrentUser
      console.log(JSON.stringify(tokenRecord.logedInUsers[0]));
      return user;
    },

    register: async (user) => {
      if(await checkUserExisted(user)){
        throw new APIError('register:error','user already existed')
      }
      let userCreated = await User.create(user);
      return userCreated.id > -1 ? true:false;
    },

    update: async (user) => {
      let previousUser = await findUserById(user.id);
      if(previousUser){
        let updatedUser = await User.update(user, {
          where:{
            id:user.id,
          }
        });
        return true;
      }

      return false;
    }
  }
