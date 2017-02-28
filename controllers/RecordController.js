const recordService = require('../service/recordService');
const bookService = require('../service/BookService');

module.exports = {
  'POST /records': async (ctx, next)=>{

  },

  'GET /records': async (ctx, next)=>{
    let queryObj = {
      userId:ctx.query.userId,
      limit:ctx.query.limit || 10,
      offset:ctx.query.offset || 0,
    }
    let results = await recordService.getRecordsByUserId(queryObj);
    ctx.rest({
      code:10000,
      message:"message success",
      result:results,
    })
  },

  'PUT /records': async (ctx, next)=>{

  }
}
