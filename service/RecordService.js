const Record = require('../models/Record');
const User = require('../models/User')
const Book = require('../models/Book')

module.exports = {
  getRecordsByUserId: async (queryObj)=>{
    Record.belongsTo(User,{foreignKey: "user_id"});
    Record.belongsTo(Book,{foreignKey: "book_id"});
    let results = await Record.findAll({
      where:{
        user_id:queryObj.userId,
      },
      include:[User,Book],
      limit:parseInt(queryObj.limit),
      offset:parseInt(queryObj.offset),
    });
    return results;
  },

  record: async (record)=>{
    Record.belongsTo(User,{foreignKey: "user_id"});
    Record.belongsTo(Book,{foreignKey: "book_id"});
    record.user_id = record.userId;
    record.book_id = record.bookId;

    let recorded = await Record.create(record);
    return recorded.id > 0 ? true:false;
  },

  update: async (record)=>{
    Record.belongsTo(User,{foreignKey: "user_id"});
    Record.belongsTo(Book,{foreignKey: "book_id"});
    record.user_id = record.userId;
    record.book_id = record.bookId;

    let recordUpdateCount = await Record.update(record,{
      where:{
        id:record.id
      }
    })
    return recordUpdateCount > 0 ? true:false;
  }
}
