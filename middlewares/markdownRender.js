const marked = require('marked');
const fs = require('fs');

module.exports = {
  renderMarkdown:()=>{
    return async (ctx, next)=>{
      ctx.renderMarkdown = (filePath)=>{
        var data = fs.readFileSync(filePath, 'utf-8');
        ctx.response.body = marked(data);
        ctx.response.type = 'text/html';
      }
      await next();
    }
  }
}
