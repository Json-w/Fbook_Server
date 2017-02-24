const User = require('../models/User')
const APIError = require('../middlewares/rest').APIError;
const uuidV4 = require('uuid/v4');
const doubanService = require('../service/doubanService');

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

      getDoubanLoginCaptcha: async () => {
        return await doubanService.getCaptcha();
      },

    // this url is just for the js community.
    logInWithDoubanAccount: async (doubanUser, captcha) => {
      let user = findUserById(doubanUser.userId);
      if(!user){
        throw new APIError('login:douban login error',
                          'current douban account not bounds to Fbook user')
      }

      return await doubanService.login({
            email:doubanUser.username,//email
            password:doubanUser.password,
          },captcha);
    },

    register: async (user) => {
      if(checkUserExisted){
        throw new APIError('register:error','user already existed')
      }
      let userCreated = await User.create(user);
      return userCreated.id > -1 ? true:false;
    }
  }