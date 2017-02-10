const User = require('../models/User')
const APIError = require('../middlewares/rest').APIError;

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
      let user = await User.findAll({
        where: {
          password: password,
          $or:{
            username: username,
            email: username,
          }
        }
      });
      console.log(`userService : ${user.length}`);
      return user[0];
    },

  register: async (user) => {
      if(checkUserExisted){
        throw new APIError('register:error','user already existed')
      }
      let userCreated = await User.create(user);
      return userCreated.id > -1 ? true:false;
    }
  }
