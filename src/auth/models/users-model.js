/* eslint-disable no-undef */

'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema
const userScehma = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userScehma.pre('save', async function (next) {
  let pwd = await bcrypt.hash(this.password, 10);
  this.password = pwd;
  next();
});

userScehma.methods.authorize = function(password) {
 return bcrypt.compare(password, this.password);
};

// model
const User = mongoose.model('User', userScehma);

module.exports = User;
