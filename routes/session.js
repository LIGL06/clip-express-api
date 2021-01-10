const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
