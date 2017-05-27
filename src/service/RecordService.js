const Record = require('../models/Record');
const User = require('../models/User')
const Book = require('../models/Book')
import bookService from './BookService'
import tokenService  from './TokenService'

export default {
  getRecordsByUserId: async(queryObj)=> {
    Record.belongsTo(User, {foreignKey: "user_id"});
    Record.belongsTo(Book, {foreignKey: "book_id"});
    let results = await Record.findAll({
      where: {
        user_id: queryObj.userId,
      },
      include: [User, Book],
      limit: parseInt(queryObj.limit),
      offset: parseInt(queryObj.offset),
    });
    return results;
  },

  record: async(record)=> {
    Record.belongsTo(User, {foreignKey: "user_id"});
    Record.belongsTo(Book, {foreignKey: "book_id"});
    record.user_id = record.userId;
    record.book_id = record.bookId;

    let recorded = await Record.create(record);
    if (recorded) {
      Book.update({status: 1}, {
        where: {
          id: record.bookId,
        }
      })
    }
    return recorded.id > 0;
  },

  update: async(record)=> {
    Record.belongsTo(User, {foreignKey: "user_id"});
    Record.belongsTo(Book, {foreignKey: "book_id"});
    record.user_id = record.userId;
    record.book_id = record.bookId;

    let recordUpdateCount = await Record.update(record, {
      where: {
        id: record.id
      }
    })

    if (recordUpdateCount) {
      if (!record.bookId) {
        let recordInDB = await Record.findAll({
          where: {
            id: record.id,
          }
        })
        record.bookId = recordInDB[0].book_id;
      }

      Book.update({status: 0}, {
        where: {
          id: record.bookId,
        }
      })
    }
    return recordUpdateCount > 0;
  },

  deleteRecordsByBookId: async(bookId)=> {
    let result = await Record.destroy({
      where: {
        book_id: bookId,
      }
    })

    return result > 0;
  },

  checkPermission: async(token, bookId)=> {
    console.log(`bookId:${bookId}`)
    let bookFound = await bookService.findBookById(bookId);
    let bookOwner = await tokenService.getUser(token);
    return bookFound.userId === bookOwner.id;
  }
}
