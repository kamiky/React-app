const koa = require('koa')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static');
const app = koa()

app.use(serve(`${__dirname}/app/`))

app.use(function* () {
  const page = fs.readFileSync(path.join(__dirname, '/app/index.html'), 'utf8')
  this.body = page
})

app.listen(8080)