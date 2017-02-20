
module.exports={
  'GET /apis':async (ctx, next)=>{
    ctx.renderMarkdown('README.md')
  }
}
