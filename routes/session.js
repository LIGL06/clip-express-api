const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const { email, name } = req.body;
  if (email !== undefined && name !== undefined) {
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
