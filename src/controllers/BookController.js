import books from '../service/BookService';
import permissionService from '../service/PermissionService';
import recordService from '../service/RecordService'

module.exports = {
  'POST /books': async(ctx, next)=> {
    let book = {
      isbn: ctx.request.body.isbn,
      amount: ctx.request.body.amount,
      bookName: ctx.request.body.bookName,
      author: ctx.request.body.author,
      brief: ctx.request.body.brief,
      times: ctx.request.body.times,
      imageUrl: ctx.request.body.imageUrl,
    }
    let token = ctx.query.token;
    if (await books.addBook(book, token)) {
      ctx.rest({
        code: '10000',
        message: 'add book success'
      })
      return;
    }

    ctx.rest({
      code: '50000',
      message: 'add book failure'
    })
  },

  'DELETE /books/:id': async(ctx, next)=> {
    let book = await books.findBookById(ctx.params.id);
    if (!await permissionService.checkOwner(ctx.query.token, book.userId)) {
      ctx.rest({
        code: '50000',
        message: 'permission denied',
      })
      return;
    }
    let result = await books.deleteBookById(ctx.params.id);
    if (result) {
      ctx.rest({
        code: '10000',
        message: 'delete book success',
      })
    } else {
      ctx.rest({
        code: '50000',
        message: 'delete book failure',
      })
    }
  },

  'GET /books/:id': async(ctx, next)=> {
    let result = await books.findBookById(ctx.params.id);
    if (result) {
      ctx.rest({
        code: '10000',
        message: 'success',
        result: result
      })
    } else {
      ctx.rest({
        code: '50000',
        message: 'find book failure',
      })
    }
  },

  'GET /books': async(ctx, next)=> {
    let offset = ctx.query.offset || 0;
    let limit = ctx.query.limit || 10;
    let bookName = ctx.query.name || '';
    let queryObj = {
      offset: offset,
      limit: limit,
      bookName: bookName,
    }
    const findResult = await books.findAllBooks(queryObj);
    ctx.rest({
      code: '10000',
      message: 'success',
      result: findResult,
    })
  },

  'GET /books/:id/records': async(ctx, next)=> {
    let queryObj = {
      bookId: ctx.params.id,
      status: ctx.query.status || 1,
      offset: ctx.query.offset || 0,
      limit: ctx.query.limit || 10
    }

    const findResult = await recordService.getRecordsByBookId(queryObj);
    ctx.rest({
      code: '10000',
      message: 'success',
      result: findResult,
    })
  }
}
