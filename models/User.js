const Sequelize = require('sequelize');
const config = require('../config');
const ModelUtil = require('./ModelUtil')

const User = ModelUtil.getSequelize().define('user',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  username:Sequelize.STRING(45),
  password:Sequelize.STRING(45),
  email:Sequelize.STRING(45),
  telephone:Sequelize.STRING(45),
  address:Sequelize.STRING(45),
  token: Sequelize.VIRTUAL,
},{
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
