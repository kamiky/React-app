'use strict'

const api = require('keymetrics-api')
const fs = require('co-fs')
const co = require('co')
const nested = require('nested-props')

module.exports = class Keymetrics {
  constructor (io) {
    this.io = io
    this.km = undefined
  }

  *init () {
    yield this.initApi()
    this.initSocket()
    this.run()
    // yield this.test()
  }

  *initApi () {
    try {
      var token = yield fs.readFile('token.txt', 'utf8')
      var public_id = yield fs.readFile('public_id.txt', 'utf8')
    } catch (err) {
      console.log(err)
      throw new Error('Please define in the root directory your keymetrics token (./token.txt) and your bucket public_id (./public_id.txt)')
    }

    this.km = new api({
      token: token,
      public_key: public_id, /* daryl bucket */
      realtime: true
    })

    return new Promise((resolve, reject) => {
      this.km.init(function (err, res) {
        if (err) {
          return reject(err)
        }
        console.log('km init')
        resolve()
      })
    })
  }

  initSocket () {
    console.log('socket init')
    this.io.on('connection', (client) => {
      console.log('client connected !')
      this.initRoutes(client)
      client.on('disconnect', function () {
        console.log('client disconnected !')
      })
    })
  }

  initRoutes (client) {
    console.log('routes init')
    const _this = this
    var data
    client.on('message', (e, data) => {
      co(function *() {
        console.log('rcv ', e, data)
        try {
          switch (e) {

            case 'keymetrics::bucketInfo':
              data = yield _this.getBucketInformation()
              client.emit('keymetrics::bucketInfo', data)
              break

            case 'keymetrics::metaServers':
              data = yield _this.getMetaServers()
              client.emit('keymetrics::metaServers', data)
              break
          }
        } catch (err) {
          console.log('Error : ', err)
        }
      })
    })
  }

  run () {
    console.log('real time started !')
    this.km.bus.on('data:*:status', (data) => {
      if (!data || !data.apps_server) {
        throw new Error('abort on data:*:status - invalid structure response')
      }
      //data.servers.daryl.data)
      var servers = {}, appData = {}, serverData = {}
      for (var serverName in data.apps_server) {
        for (var appName in data.apps_server[serverName]) {

          /* parse servers realtime data */
          serverData = nested.get(data, `servers.${serverName}.data.server`)
          nested.set(servers, `${serverName}.data.total_mem`, serverData.total_mem)
          nested.set(servers, `${serverName}.data.free_mem`, serverData.free_mem)
          nested.set(servers, `${serverName}.data.uptime`, serverData.uptime)
          nested.set(servers, `${serverName}.data.platform`, serverData.platform)
          nested.set(servers, `${serverName}.data.node_version`, serverData.node_version)
          nested.set(servers, `${serverName}.data.pm2_version`, serverData.pm2_version)

          /* parse applications realtime data */
          appData = nested.get(data, `apps_server.${serverName}.${appName}`)
          if (appData) {
            nested.set(servers, `${serverName}.apps.${appName}.pid`, appData.pid)
            nested.set(servers, `${serverName}.apps.${appName}.name`, appData.name)
            nested.set(servers, `${serverName}.apps.${appName}.interpreter`, appData.interpreter)
            nested.set(servers, `${serverName}.apps.${appName}.restart_time`, appData.restart_time)
            nested.set(servers, `${serverName}.apps.${appName}.created_at`, appData.created_at)
            nested.set(servers, `${serverName}.apps.${appName}.pm_uptime`, appData.pm_uptime)
            nested.set(servers, `${serverName}.apps.${appName}.status`, appData.status)
            nested.set(servers, `${serverName}.apps.${appName}.cpu`, appData.cpu)
            nested.set(servers, `${serverName}.apps.${appName}.memory`, appData.memory)
            nested.set(servers, `${serverName}.apps.${appName}.process_count`, appData.process_count)
            if (appData.versioning) {
              nested.set(servers, `${serverName}.apps.${appName}.versioning.type`, appData.versioning.type)
              nested.set(servers, `${serverName}.apps.${appName}.versioning.url`, appData.versioning.url)
              nested.set(servers, `${serverName}.apps.${appName}.versioning.comment`, appData.versioning.comment)
              nested.set(servers, `${serverName}.apps.${appName}.versioning.remote`, appData.versioning.remote)
            }
          }
        }
      }
      this.io.sockets.emit('keymetrics::realTime', servers)
    })
  }

  *getBucketInformation () {
    return new Promise((resolve, reject) => {
      this.km.bucket.get((err, res) => {
        if (err || !res) {
          return reject(err)
        }
        var data = {
          public_id: res.public_id,
          name: res.name,
          username: nested.get(res, 'credits.payer.username'),
          offer: nested.get(res, 'credits.offer_type')
        }
        resolve(data)
      })
    })
  }

  *getMetaServers () {
    return new Promise((resolve, reject) => {
      this.km.bucket.getMetaServers((err, servers) => {
        if (err || !servers) {
          return reject(err)
        }
        var data = []
        for (var i = 0, l = servers.length; i < l; ++i) {
          data.push({
            name: servers[i].name,
            ip: servers[i].ip,
            cpus: servers[i].cpus,
            pm2_version: servers[i].pm2_version,
            active: servers[i].active
          })
        }
        resolve(data)
      })
    })
  }

  *test () {
    return new Promise((resolve, reject) => {
      this.km.bucket.Data.events({}, (err, res) => {
        if (err) {
          return reject(err)
        }
        console.log(res)
        resolve()
      })
    })
  }
}
