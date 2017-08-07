require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

// mock 数据 --------- start
// var appData = require('../data.json')

// var choice = appData.choice
// var comment = appData.comment
// var course = appData.course
// var search = appData.search
// var hotSearch = appData.hotSearch
// var evaluate = appData.evaluate

// var apiRoutes = express.Router()

// apiRoutes.get('/v1/user/homepage', function (req, res) {
//   res.json({
//     status: 200,
//     data: choice
//   })
// })

// apiRoutes.get('/v1/user/user_information', function (req, res) {
//   res.json({
//     status: 200,
//     data: comment
//   })
// })

// apiRoutes.get('/v1/user/course_detail', function(req, res) {
//   res.json({
//     status: 200,
//     data: course
//   })
// })

// apiRoutes.get('/v1/user/search_course', function (req, res) {
//   res.json({
//     status: 200,
//     data: search
//   })
// })

// apiRoutes.get('/v1/user/hot_search', function (req, res) {
//   res.json({
//     status: 200,
//     data: hotSearch
//   })
// })

// apiRoutes.post('/v1/user/approval', function (req, res) {
//   res.json({
//     status: 200,
//     data: ''
//   })
// })

// apiRoutes.post('/v1/user/disapproval', function (req, res) {
//   res.json({
//     status: 200,
//     data: ''
//   })
// })

// apiRoutes.get('/v1/user/modify_assessment', function (req, res) {
//   res.json({
//     status: 200,
//     data: evaluate
//   })
// })

// apiRoutes.post('/v1/user/fill_assess', function (req, res) {
//   res.json({
//     status: 200,
//     data: ''
//   })
// })

// app.use('/api', apiRoutes)
// mock 数据 --------- end

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
