const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  roles: [{ type: String, ref: 'Role' }],
})

module.exports = model('User', userSchema)
