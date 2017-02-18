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

  'GET /douban/captcha': async(ctx, next) => {
    ctx.rest(await users.getDoubanLoginCaptcha());
  },

  'POST /douban/markBookAsRead/:bookId':async(ctx, next) =>{
    let bookId = ctx.params.bookId;
    let cookies = ctx.request.body.cookies;
    return users.markBookAsRead(bookId,cookies);
  },

  'POST /user/douban/session': async (ctx, next)=>{
    let captcha = null;
    if(ctx.request.body.captchaSolution != undefined && ctx.request.body.captchaId != undefined){
      captcha = {
        solution:ctx.request.body.captchaSolution,
        id:ctx.request.body.captchaId,
      }
    }
    let user = await users.logInWithDoubanAccount({
      username:ctx.request.body.username,
      password:ctx.request.body.password,
      userId:ctx.request.body.userId,
    },captcha);
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
