const Router = require('express')
const { check } = require('express-validator')

const authController = require('./authController')
const authMiddleware = require('./authMiddleware')
const roleMiddleware = require('./roleMiddleware')
const Role = require('./RoleModel')

const router = new Router()

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Пароль должен быть больше 4 и меньше 10 символов'
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
)
router.post('/login', authController.login)
router.get(
  '/users',
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  authController.getUsers
)

module.exports = router
