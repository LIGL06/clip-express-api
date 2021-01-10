const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const sessionRouter = require('./routes/session');
const usersRouter = require('./routes/customers');

dotenv.config();
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/session', sessionRouter);
app.use('/customers', usersRouter);

app.listen(process.env.PORT || 3001, () => {
  console.info('Listening on PORT: ' + process.env.PORT);
});

module.exports = app;
