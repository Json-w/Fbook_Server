const Sequelize = require('sequelize');
const config = require('../config');
const User = require('./User');
const Book = require('./Book');

const sequelize = new Sequelize(config.database,config.username, config.password,{
  host: config.host,
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    idle:30000,
  }
})

const Record = sequelize.define('record',{
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
