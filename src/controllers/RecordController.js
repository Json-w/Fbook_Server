import recordService from '../service/RecordService';

module.exports = {
  'POST /records': async(ctx, next)=> {
    let record = {
      status: ctx.request.body.status || 2,
      startTime: ctx.request.body.startTime || new Date(),
      userId: ctx.request.body.userId,
      bookId: ctx.request.body.bookId,
    }

    if (await recordService.record(record)) {
      ctx.rest({
        code: '10000',
        message: "record success"
      })
    }
  },

  'GET /records': async(ctx, next)=> {
    let queryObj = {
      userId: ctx.query.userId,
      limit: ctx.query.limit || 10,
      offset: ctx.query.offset || 0,
    }
    let results = await recordService.getRecordsByUserId(queryObj);
    if (results) {
      ctx.rest({
        code: '10000',
        message: "message success",
        result: results,
      })
    } else {
      ctx.rest({
        code: '50000',
        message: "update failure",
      });
    }
  },

  'PUT /records': async(ctx, next)=> {
    let record = {
      id: ctx.request.body.id,
      status: ctx.request.body.status || 0,
      bookId: ctx.request.body.bookId,
    }
    if (ctx.request.body.status == 0) {
      record.endTime = ctx.request.body.endTime || new Date();
    }
    if (!await recordService.checkPermission(ctx.query.token, record.bookId)) {
      ctx.rest({
        code: '50000',
        message: 'permission denied',
      })
      return;
    }
    let isUpdated = await recordService.update(record);
    if (isUpdated) {
      ctx.rest({
        code: '10000',
        message: "update success",
      })
    } else {
      ctx.rest({
        code: '50000',
        message: "update failure",
      })
    }
  }
}
