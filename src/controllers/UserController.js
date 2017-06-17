import users from '../service/UserService';
const bookService = require('../service/BookService')
import permissionService from '../service/PermissionService';
import emailService from '../service/EmailService';
import tokenService from '../service/TokenService';

module.exports = {
  'POST /user/session': async(ctx, next)=> {
    let user = await users.logIn(ctx.request.body.username, ctx.request.body.password);
    if (user != null) {
      ctx.rest({
        code: '10000',
        message: "success",
        result: user,
      });
    } else {
      ctx.response.status = 400;
      ctx.rest({
        code: 'auth:failure',
        message: 'failure in login'
      })
    }
  },

  'POST /user/register': async(ctx, next)=> {
    let user = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
      telephone: ctx.request.body.telephone,
      address: ctx.request.body.address,
      imageUrl: ctx.request.body.imageUrl
    }
    if (await users.checkUserExisted(user)) {
      throw new APIError('register:error', 'user already existed')
    }
    let emailUUID = await users.saveUserInfoToRedis(user);
    let result = await emailService.sendMessage({
      to: user.email,
      subject: 'please verify your email.',
      html: '<h2>please verify your email by below link:</h2>' +
      // `<p>http://182.254.228.128:3000/user/verify/${emailUUID}</p>` +
      `<p>http://localhost:3000/user/verify/${emailUUID}</p>` +
      '<br> <p>if you don\'t have the context about this email,please ignore it.</p>'
    })
    console.log(`send email result:${result}`);
    if (result) {
      ctx.rest({
        code: '10000',
        message: 'please verify your email'
      })
    } else {
      ctx.rest({
        code: '50000',
        message: 'register failure'
      })
    }
  },

  'GET /user/verify/:uuid': async(ctx, next)=> {
    let userInfo = await tokenService.get(ctx.params.uuid);
    console.log()
    if (userInfo) {
      let isRegisterSuccess = await users.register(userInfo);
      if (isRegisterSuccess) {
        ctx.rest({
          code: '10000',
          message: 'register success!!'
        })
      } else {
        ctx.rest({
          code: '50000',
          message: 'register failure!!'
        })
      }
    } else {
      ctx.rest({
        code: '50000',
        message: 'verify failure due to expire.'
      })
    }
  },

  'PUT /user/': async(ctx, next) => {
    if (!await permissionService.checkOwner(ctx.query.token, ctx.request.body.id)) {
      console.log('permission denied')
      ctx.rest({
        code: '50000',
        message: 'permission denied',
      })
      return;
    }
    let user = {};
    ['id', 'username', 'password', 'email', 'telephone', 'address', 'imageUrl'].forEach((k) => {
      let v = ctx.request.body[k]
      if (v !== undefined && v !== null) {
        user[k] = v
      }
    })
    let isUpdated = await users.update(user);
    if (isUpdated) {
      ctx.rest({
        code: '10000',
        message: 'success',
      })
    }
  },

  'GET /user/:id/books': async(ctx, next) => {
    const findResult = await bookService.findBooksByUserId(ctx.params.id);
    ctx.rest({
      code: '10000',
      message: 'success',
      result: findResult,
    });
  },

  'GET /user/:id': async(ctx, next)=> {
    const findResult = await users.findUserById(ctx.params.id);
    if (findResult) {
      ctx.rest({
        code: '10000',
        message: 'success',
        result: findResult,
      });
    } else {
      ctx.rest({
        code: '50000',
        message: 'user not found',
      })
    }
  }
}
