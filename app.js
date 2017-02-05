const Koa = require('Koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database,config.username, config.password,{
  host: config.host,
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    idle:30000,
  }
})

const User = sequelize.define('user',{
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
},{
  tableName: 'user',
  timestamps: false,
});

(async ()=>{
  let users = await User.findAll();
  console.log(`find ${users.length} users:`);
  for(let p of users){
    console.log(JSON.stringify(p));
  }
})();

app.use(bodyParser());
app.use(controller());

app.listen(3000);
console.log('app started at port 3000');
