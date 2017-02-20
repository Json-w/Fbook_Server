const users = require('../service/userService');

module.exports = {
  'POST /user/session': async (ctx, next)=>{
    let user = await users.logIn(ctx.request.body.username,ctx.request.body.password);
    if(user != null){
      ctx.rest(user);
    }else {
      ctx.response.status = 400;
      ctx.rest({
        code: 'auth:failure',
        message: 'failure in login'
      })
    }
  },

  'POST /user/register': async (ctx, next)=>{
    let user = {
      username:ctx.request.body.username,
      password:ctx.request.body.password,
      email:ctx.request.body.email,
      telephone:ctx.request.body.telephone,
      address:ctx.request.body.address,
      imageUrl:ctx.request.body.imageUrl
    }
    let isRegisterSuccess = await users.register(user);
    if(isRegisterSuccess){
      ctx.rest({
        code: 'success',
        message: 'register success'
      })
    }else {
      ctx.rest({
        code: 'failure',
        message: 'register failure'
      })
    }
  }
}
