const Sequelize = require('sequelize');
const config = require('../config');

let sequelize;
module.exports = {
  getSequelize:()=>{
    if(sequelize === undefined){
      sequelize = new Sequelize(config.database,config.username, config.password,{
        host: config.host,
        dialect: 'mysql',
        pool:{
          max:5,
          min:0,
          idle:30000,
        }
      })
    }
    return sequelize;
  }
}
