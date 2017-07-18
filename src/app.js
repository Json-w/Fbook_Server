import 'babel-polyfill'
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const rest = require('./middlewares/rest');
const filter = require('./middlewares/filter');
const renderMarkdown = require('./middlewares/markdownRender');
const staticServer = require('koa-static');
const path = require('path')

app.use(staticServer(path.join( __dirname, '../public')))
app.use(bodyParser());
app.use(rest.restify());
console.log(process.env.ENV);
if (process.env.ENV !== "dev") {
  app.use(filter.tokenValidate());
}
app.use(renderMarkdown.renderMarkdown())
app.use(controller());
app.listen(3000);
console.log('app started at port 3000');
