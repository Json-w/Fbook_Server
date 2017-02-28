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
  }
}
