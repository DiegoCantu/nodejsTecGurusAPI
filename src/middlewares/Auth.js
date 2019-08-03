const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../Models/User');

module.exports = function Auth(req, res, next) {
  const { authorization } = req.headers;

  const onDecode = async (err, decoded) => {
    if (err) {
      next();
      return;
    }
    const user = await User.findOne({ _id: decoded.id });
    req.user = user;
    next();
  };

  jwt.verify(authorization, secret, onDecode);
};
