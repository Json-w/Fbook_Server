import recordService from '../service/RecordService';
const bookService = require('../service/BookService');

module.exports = {
  'POST /records': async (ctx, next)=>{
    let record = {
      status:ctx.request.body.status || 1,
      startTime:ctx.request.body.startTime || new Date(),
      userId:ctx.request.body.userId,
      bookId:ctx.request.body.bookId,
    }

    if(await recordService.record(record)){
      ctx.rest({
        code:'10000',
        message:"record success"
      })
    }
  },

  'GET /records': async (ctx, next)=>{
    let queryObj = {
      userId:ctx.query.userId,
      limit:ctx.query.limit || 10,
      offset:ctx.query.offset || 0,
    }
    let results = await recordService.getRecordsByUserId(queryObj);
    if(results){
      ctx.rest({
        code:'10000',
        message:"message success",
        result:results,
      })  
    }else {
      ctx.rest({
        code:'50000',
        message:"update failure",
      });
    }
  },

  'PUT /records': async (ctx, next)=>{
    let record = {
      id:ctx.request.body.id,
      status:ctx.request.body.status || 0,
      endTime:ctx.request.body.endTime || new Date(),
      userId:ctx.request.body.userId,
      bookId:ctx.request.body.bookId,
    }

    let isUpdated = await recordService.update(record);
    if(isUpdated){
      ctx.rest({
        code:'10000',
        message:"update success",
      })
    }else {
      ctx.rest({
        code:'50000',
        message:"update failure",
      })
    }
  }
}
