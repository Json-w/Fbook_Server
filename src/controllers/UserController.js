import users from '../service/UserService';
import bookService from '../service/BookService';
import permissionService from '../service/PermissionService';

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
    let isRegisterSuccess = await users.register(user);
    if (isRegisterSuccess) {
      ctx.rest({
        code: '10000',
        message: 'register success'
      })
    } else {
      ctx.rest({
        code: '50000',
        message: 'register failure'
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
  }
}
