module.exports = (role) => (req, res, next) => {
  const { roles } = req.user
  if (!roles.some((r) => r === role)) {
    return res.status(403).json({ message: 'У вас недостаточно прав' })
  }
  next()
}
