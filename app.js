const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const rest = require('./middlewares/rest');
const filter = require('./middlewares/filter');
const renderMarkdown = require('./middlewares/markdownRender');

app.use(bodyParser());
app.use(rest.restify());
//developing
// app.use(filter.tokenValidate());
app.use(renderMarkdown.renderMarkdown())
app.use(controller());
app.listen(3000);
console.log('app started at port 3000');
