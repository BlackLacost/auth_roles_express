const config = require('config')
const jwt = require('jsonwebtoken')

const secret = config.get('secret')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }

    req.user = jwt.verify(token, secret)
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'Пользователь не авторизован' })
  }
}
