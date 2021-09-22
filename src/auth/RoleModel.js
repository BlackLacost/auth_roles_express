const { Schema, model } = require('mongoose')

const USER_ROLE = 'USER'
const ADMIN_ROLE = 'ADMIN'

const roleSchema = new Schema({
  value: { type: String, unique: true, default: USER_ROLE },
})

module.exports = model('Role', roleSchema)

module.exports.ADMIN = ADMIN_ROLE
module.exports.USER = USER_ROLE
