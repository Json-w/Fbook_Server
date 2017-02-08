const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const rest = require('./middlewares/rest')

app.use(bodyParser());
app.use(rest.restify());
app.use(controller());

app.listen(3000);
console.log('app started at port 3000');
