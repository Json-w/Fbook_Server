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
  }
}
