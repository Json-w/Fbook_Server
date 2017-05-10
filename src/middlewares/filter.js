const APIError = require('./rest').APIError;
import tokenService from '../service/TokenService'

const noValidateUrls = ['/user/session', '/user/register'];
module.exports = {
  tokenValidate: () => {
    return async(ctx, next) => {
      console.log(`request url:${ctx.url}`);
      for (let url of noValidateUrls) {
        if (ctx.url.split('?')[0] === url) {
          await next();
          return;
        }
      }
      let token = ctx.query.token;
      let result = await tokenService.getUser(token);
      console.log(`get result from redis:${!result}`);
      if (result) {
        await next();
        return;
      }
      console.log('validate failure');
      throw new APIError('40001', 'token validate error');
    }
  }
}
