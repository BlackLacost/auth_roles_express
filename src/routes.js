const authRouter = require('./auth/authRouter')

function routes(app) {
  app.use('/auth', authRouter)

  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}

module.exports = routes
