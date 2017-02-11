const logedInUsers = require('../tokenRecord')
const APIError = require('./rest').APIError;

const noValidateUrls = ['/user/session','/user/register'];
module.exports = {
  tokenValidate:() => {
    return async (ctx, next) => {
      console.log(`request url:${ctx.url}`);
      for(url of noValidateUrls){
          if(ctx.url.split('?')[0] === url){
            await next();
            return;
          }
      }
      let token = ctx.query.token;
      for(logedInUser of logedInUsers){
        if(token === logedInUser.token){
          await next();
          return;
        }
      }
      console.log('validate failure');
      throw new APIError('auth:failure','token validate error');
    }
  }
}
