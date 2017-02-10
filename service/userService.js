const User = require('../models/User')

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
  }
