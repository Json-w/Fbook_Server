const User = require('../models/User')

module.exports = {
  logIn: async (username,password) => {
      let user = await User.findAll({
        where: {
          username: 'pei',
        }
      });
      console.log(`userService : ${user.length}`);
      return user[0];
    },
  }
