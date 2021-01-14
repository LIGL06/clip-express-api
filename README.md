# Clip Express API Challenge

A barebones Node.js app using [Express 4](http://expressjs.com/).

This Node.js app uses [Openpay](https://github.com/open-pay/openpay-node) to handle all the data of customers, payments and a summary of a sandbox account.

*DB not necessary as all info comes directly from Openpay*

This app also handles session middleware with [JWT](https://github.com/auth0/node-jsonwebtoken) and [Express-JWT](https://github.com/auth0/express-jwt) to procect Openpay data from outside the app.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed (12.11+).

```sh
git clone https://github.com/LIGL06/clip-express-api.git
cd clip-express-api
cp .env.dev .env
npm install
npm start
```

Your api should now be running on [localhost:5001](http://localhost:5001/).

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [10 Habits of a Happy Node Hacker](https://blog.heroku.com/archives/2014/3/11/node-habits)
- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
