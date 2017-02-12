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
    }
    let token = ctx.query.token;
    console.log(`BookController.js:${token}`);
    if(books.addBook(book, token)){
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

  'GET /books': async (ctx, next)=>{
    ctx.rest(await books.findAllBooks())
  }
}
