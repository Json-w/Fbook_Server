const Sequelize = require('sequelize');
const config = require('../config');
const User = require('./User')
const sequelize = new Sequelize(config.database,config.username, config.password,{
  host: config.host,
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    idle:30000,
  }
})

const Book = sequelize.define('book',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  isbn:Sequelize.STRING(45),
  amount:Sequelize.INTEGER,
  bookName:Sequelize.STRING(45),
  author:Sequelize.STRING(45),
  brief:Sequelize.STRING(45),
  times:Sequelize.INTEGER,
  imageUrl:Sequelize.STRING(75),
  satus:Sequelize.INTEGER,
  // user:{
  //   type:Sequelize.INTEGER,
  //   field:"user_id",
  //   references:{
  //     model:User,
  //     key:'id',
  //   }
  // }
},{
  tableName: 'book',
  timestamps: false,
});

module.exports = Book;
