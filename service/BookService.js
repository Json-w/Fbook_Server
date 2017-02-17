const Book = require('../models/Book')
const User = require('../models/User')
const tokenRecord = require('../tokenRecord')
module.exports = {
    addBook: async (book,token)=>{
      Book.belongsTo(User,{foreignKey: "user_id"});
      for (user of tokenRecord.logedInUsers) {
        if(token === user.token){
          book.user_id = user.user.id;
          console.log(`the book ready to save:${JSON.stringify(book)}`);
          let savedBook = await Book.create(book);
          return savedBook.id > -1 ? true:false;
        }
      }
      return false;
    },

    findAllBooks: async ()=>{
      Book.belongsTo(User,{foreignKey: "user_id"});
      let books = await Book.findAll({include: [User]});
      return books;
    },

    findBooksByUserId: async (userId)=>{
      Book.belongsTo(User,{foreignKey: "user_id"});
      let books = await Book.findAll(
        {
          where:{
            user_id : userId,
          },
          include: [User]
        });
      return books;
    }
}