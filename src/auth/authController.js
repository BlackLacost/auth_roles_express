const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const secret = config.get('secret')

const Role = require('./RoleModel')
const User = require('./UserModel')

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

module.exports = {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибки при регистрации', errors })
      }

      const { username, password } = req.body

      const candidate = await User.findOne({ username })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' })
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const userRole = await Role.findOne({ value: Role.USER })

      const user = new User({
        username,
        password: hash,
        roles: [userRole.value],
      })
      await user.save()

      return res.json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: 'Логин или пароль не верен' })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Логин или пароль не верен' })
      }

      const token = generateAccessToken(user._id, user.roles)
      console.log(token)

      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login error' })
    }
  },

  async getUsers(req, res) {
    try {
      // const userRole = new Role()
      // const adminRole = new Role({ value: 'ADMIN' })
      // await userRole.save()
      // await adminRole.save()
      const users = await User.find()
      res.json({ users })
    } catch (e) {}
  },
}
