/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const mongoose = require('mongoose');
const server = require('./src/server.js');
require ('dotenv').config();

mongoose
  .connect(`${process.env.MONGOOSE_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(process.env.PORT || 3000);

  })
  .catch((e) => console.error('CONNECTION ISSUE', e.message));
