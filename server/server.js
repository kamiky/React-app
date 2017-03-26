'use strict'

const koa = require('koa')
const serve = require('koa-static')
const app = koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const co = require('co')
const Keymetrics = require('./utils/keymetrics')

app.use(serve(`${__dirname}/../app/`))

// app.use(function* () {
//   const page = fs.readFileSync(path.join(__dirname, '../app/index.html'), 'utf8')
//   this.body = page
// })

const keymetrics = new Keymetrics(io)
co(function *() {
  try {
    yield keymetrics.init()
  } catch (err) {
    console.log(err)
  }
})

server.listen(8080)
