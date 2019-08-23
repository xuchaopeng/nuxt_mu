const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyParser');
const session = require('koa-generic-session');
const Redis = require('koa-redis');
const Json = require('koa-json');
const dbConfig = require( './dbs/config');
const passport = require('./interface/utils/passport')
//接口
const geo = require('./interface/geo');
const users = require('./interface/users');


const app = new Koa()
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production';

//连接redis
app.keys = ['mt','keyskeys'];
app.proxy = true;
app.use(session({key:'mt',prefix:'mt:uid',store:new Redis()}))

//post请求处理
app.use(bodyParser({
  extendTypes:['json','from','text']
}));
app.use(Json())

//连接mongdb
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})

//密码验证
app.use(passport.initialize());
app.use(passport.session());

async function start () {
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // 构建开发环境
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  //路由挂载
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(users.routes()).use(users.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
