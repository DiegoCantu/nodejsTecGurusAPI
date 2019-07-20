const mongoose = require('mongoose');

const schemaUser = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  vip: Boolean,
  email: String,
  password: String
});

exports.Model = mongoose.model('User', schemaUser);

