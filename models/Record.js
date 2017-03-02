const Sequelize = require('sequelize');
const config = require('../config');
const User = require('./User');
const Book = require('./Book');
const ModelUtil = require('./ModelUtil')

const Record = ModelUtil.getSequelize().define('record',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  status:Sequelize.INTEGER,
  startTime:Sequelize.DATE,
  endTime:Sequelize.DATE,
},{
  tableName: 'record',
  timestamps: false,
});

module.exports = Record;
