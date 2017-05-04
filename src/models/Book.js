const Sequelize = require('sequelize');
const config = require('../config');
const User = require('./User')
const ModelUtil = require('./ModelUtil')

const Book = ModelUtil.getSequelize().define('book',{
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
  status:Sequelize.INTEGER,
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
