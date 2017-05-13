const Book = require('../models/Book')
const User = require('../models/User')
const tokenRecord = require('../tokenRecord')
import recordService from './RecordService'
import tokenService from './TokenService'

module.exports = {
  addBook: async(book, token)=> {
    Book.belongsTo(User, {foreignKey: "user_id"});
    let user = await tokenService.getUser(token)
    if (token === user.token) {
      book.user_id = user.id;
      console.log(`the book ready to save:${JSON.stringify(book)}`);
      let savedBook = await Book.create(book);
      return savedBook.id > -1 ? true : false;
    }
    return false;
  },

  findAllBooks: async(queryObj)=> {
    Book.belongsTo(User, {foreignKey: "user_id"});
    let books = await Book.findAll({
      where: {
        'bookName': {
          '$like': '%' + queryObj.bookName + '%',
        }
      },
      include: [User],
      limit: parseInt(queryObj.limit),
      offset: parseInt(queryObj.offset),
    });
    return books;
  },

  findBooksByUserId: async(userId)=> {
    // Book.belongsTo(User,{foreignKey: "user_id"});
    let books = await Book.findAll(
      {
        where: {
          user_id: userId,
        },
        // include: [User]
      });
    return books;
  },

  deleteBookById: async(bookId)=> {
    console.log(`BookService: deleting ${bookId}`);
    recordService.deleteRecordsByBookId(bookId);
    let result = await Book.destroy({
      where: {
        id: bookId,
      }
    });
    return result;
  },

  findBookById: async(bookId)=> {
    let result = await Book.findAll(
      {
        where: {
          id: bookId,
        }
      }
    );
    return result;
  }
}
