const books = require('../service/BookService');

module.exports = {
  'POST /book/add': async (ctx, next)=>{
    let book = {
      isbn:ctx.request.body.isbn,
      amount:ctx.request.body.amount,
      bookName:ctx.request.body.bookName,
      author:ctx.request.body.author,
      brief:ctx.request.body.brief,
      times:ctx.request.body.times,
      imageUrl:ctx.request.body.imageUrl,
    }
    let token = ctx.query.token;
    console.log(`BookController.js:${token}`);
    if(await books.addBook(book, token)){
      ctx.rest({
        code: 'success',
        message: 'add book success'
      })
      return;
    }

    ctx.rest({
      code: 'failure',
      message: 'add book failure'
    })
  },

  'DELETE /books/:id': async (ctx, next)=>{
    let result = await books.deleteBookById(ctx.params.id);
    ctx.rest({
      code:'success',
      result:result,
    })
  },

  'GET /books': async (ctx, next)=>{
    let offset = ctx.query.offset || 0;
    let limit = ctx.query.limit || 10;
    let bookName = ctx.query.name || '';
    let queryObj = {
      offset:offset,
      limit:limit,
      bookName:bookName,
    }
    const findResult = await books.findAllBooks(queryObj);
    ctx.rest({
      code: 'success',
      result:findResult,
    })
  },
}
