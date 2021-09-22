const express = require('express')
const config = require('config')

const connect = require('./src/db')
const routes = require('./src/routes')

const port = config.get('port')
const host = config.get('host')

const app = express()

app.use(express.json())

app.listen(port, async () => {
  console.log(`Сервер запущен на http://${host}:${port}`)
  await connect()
  console.log('Вы успешно подключились к DB')
  routes(app)
})
