module.exports = {
  APIError: function (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
  },
  restify: ()=> {
    return async(ctx, next) => {
      ctx.rest = (data) => {
        ctx.response.set('Access-Control-Allow-Origin', '*');
        ctx.response.type = 'application/json';
        ctx.response.body = data;
      }
      try {
        await next();
      } catch (e) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.response.body = {
          code: e.code || 'internal:unknown_error',
          message: e.message || ''
        };
      }
    }
  }
}
