const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const jwt = require('express-jwt');

const sessionRouter = require('./routes/session');
const usersRouter = require('./routes/customers');
const paymentsRouter = require('./routes/payments');

dotenv.config();
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers && req.headers['x-jwt-token']) {
      return req.headers['x-jwt-token'];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({ path: ['/session'] }));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  }
});

app.use('/session', sessionRouter);
app.use('/customers', usersRouter);
app.use('/payments', paymentsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.info('Listening on PORT: ' + process.env.PORT);
});

module.exports = app;
