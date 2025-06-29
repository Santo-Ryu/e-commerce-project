function checkRole(...requiredRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

module.exports = checkRole;