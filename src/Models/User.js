const mongoose = require('mongoose');

const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['editor', 'admin'],
    default: 'editor',
  },
});

module.exports = mongoose.model('User', schemaUser);
