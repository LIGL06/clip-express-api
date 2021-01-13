const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  if (req.body.email !== undefined && req.body.name !== undefined) {
    const session = {
      user: { ...req.body }
    }
    const token = jwt.sign({
      session
    }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.send({ token, session });
  } else {
    res.status(403).send('Incomplete Request')
  }
});

module.exports = router;
