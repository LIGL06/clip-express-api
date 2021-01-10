const express = require('express');
const router = express.Router();
const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);

/* GET users listing. */
router.get('/', function(req, res, next) {
  openpay.customers.list(function (error, list) {
    res.send(list);
  });
});

module.exports = router;
