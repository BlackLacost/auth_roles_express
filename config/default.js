const DB_NAME = 'auth_roles'
const DB_USER = 'blacklacost'
const DB_PASS = 'blacklacost123'

module.exports = {
  port: 5000,
  host: 'localhost',
  dbUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.y0ndo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  secret: 'secretjwt',
}
