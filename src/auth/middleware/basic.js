const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/users-model.js');
// const mongoose = require('mongoose');

module.exports = async ( req,res,next ) =>{
  try {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

 
    const user = await Users.findOne({ username: username });
    console.log('User info:',user);
    // const valid = await user.authorize(password);
    const valid = bcrypt.compare(password, this.password);

    if (valid) {
      req.user = user;
      next();
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login');
    next(error);
  }
};
