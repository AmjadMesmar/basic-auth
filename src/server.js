/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./auth/router.js');
const notFoundHndler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1', router);
app.use('*', notFoundHndler);
app.use(errorHandler);
// app.use('/',homeRouteHandler);


// function homeRouteHandler(req,res){
//   res.send('Welcome to the server!');
// }

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
