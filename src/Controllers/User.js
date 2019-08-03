const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { secret } = require('../config');

async function createUser(req, res) {
  const { username, email, password: uncryptedPassword } = req.body;

  const password = bcrypt.hashSync(uncryptedPassword, 8);

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'oops, error on saving user',
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  let user = null;
  try {
    user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(404).json({
        msg: 'User not found',
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Error searching for user',
    });
  }
  const isEqual = bcrypt.compareSync(password, user.password);

  if (isEqual) {
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.json({ token });
    return;
  }

  res.status(404).json({
    msg: 'Invalid Password',
  });
}

async function getUsers(req, res) {
  const { user } = req;
  console.log('USER : ', user);
  const userTypes = ['admin'];

  if (!user || !userTypes.includes(user.type)) {
    res.status(401).json({
      msg: 'Authorization only',
    });
    return;
  }

  const users = await User.find(
    {},
    {
      _id: 1,
      username: 1,
      email: 1,
    },
  ).exec();
  res.json(users);
}

exports.init = (expressApp) => {
  expressApp.post('/api/user', createUser);
  expressApp.get('/api/user', getUsers);
  expressApp.post('/api/user/login', login);
};

//Coomnets1
