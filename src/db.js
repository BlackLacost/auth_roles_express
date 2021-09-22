const config = require('config')
const mongoose = require('mongoose')

const dbUrl = config.get('dbUrl')

module.exports = async () => {
  return await mongoose.connect(dbUrl)
}
