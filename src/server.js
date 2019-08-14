const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

/**
 * Database setup
 */
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-y1oeh.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);
