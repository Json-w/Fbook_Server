const tokenRecord = require('../tokenRecord')
const APIError = require('./rest').APIError;

const noValidateUrls = ['/user/session','/user/register','/user/douban/session','/douban/captcha'];
module.exports = {
  tokenValidate:() => {
    return async (ctx, next) => {
      console.log(`request url:${ctx.url}`);
      for(let url of noValidateUrls){
          if(ctx.url.split('?')[0] === url){
            await next();
            return;
          }
      }
      let token = ctx.query.token;
      console.log();
      for(let logedInUser of tokenRecord.logedInUsers){
        if(token === logedInUser.token){
          await next();
          return;
        }
      }
      console.log('validate failure');
      throw new APIError('40001','token validate error');
    }
  }
}
