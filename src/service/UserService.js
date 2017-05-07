const User = require('../models/User')
const APIError = require('../middlewares/rest').APIError;
const uuidV4 = require('uuid/v4');

import tokenService from './TokenService';

async function checkUserExisted(user) {
  let userFound = await User.findAll({
    where: {
      $or: {
        username: user.username,
        email: user.email,
      }
    }
  })
  return userFound.length > 0;
}

async function findUserById(userId) {
  let userFound = await User.findAll({
    where: {
      id: userId
    }
  })
  return userFound;
}

export default {
  logIn: async(username, password) => {
    let users = await User.findAll({
      where: {
        password: password,
        $or: {
          username: username,
          email: username,
        }
      }
    });
    console.log(`userService : ${users.length}`);
    var user = users[0];
    if (user == null) {
      return null;
    }
    user.password = null;
    user['token'] = uuidV4();

    //todo
    tokenService.saveUser({
      user: user,
      time: new Date().getTime(),
    })
    return user;
  },

  register: async(user) => {
    if (await checkUserExisted(user)) {
      throw new APIError('register:error', 'user already existed')
    }
    let userCreated = await User.create(user);
    return userCreated.id > -1;
  },

  update: async(user) => {
    let previousUser = await findUserById(user.id);
    if (previousUser) {
      let updatedUser = await User.update(user, {
        where: {
          id: user.id,
        }
      });

      return updatedUser[0] > 0;
    }

    return false;
  }
}
