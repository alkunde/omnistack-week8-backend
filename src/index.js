const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/**
 * Database setup
 */
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-y1oeh.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);
