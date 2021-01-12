const express = require('express');
const router = express.Router();
const Openpay = require('openpay');
/* GET users listing. */
router.get('/', (req, res, next) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  customers.list((error, list) => {
    if (error) {
      res.status(403).send('Openpay error');
    } else {
      res.send(list);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  customers.get(req.params.id, (error, customer) => {
    if (error) {
      res.status(403).send('Openpay error');
    } else {
      res.send(customer);
    }
  });
});

router.post('/', (req, res, next) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  const customerRequest = {
    ...req.body,
    requires_account: false
  };
  console.log(req.body);
  customers.create(customerRequest, (error, customer) => {
    if (error) {
      console.error(error);
      res.status(403).send('Openpay error');
    } else {
      console.log(customer);
      res.send(customer);
    }
  });
})

router.put('/:id', (req, res, next) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  const customerRequest = {
    ...req.body,
    requires_account: false
  };
  console.log(req.body);
  customers.update(req.params.id, customerRequest, (error, customer) => {
    if (error) {
      console.error(error);
      res.status(403).send('Openpay error');
    } else {
      console.log(customer);
      res.send(customer);
    }
  });
})

module.exports = router;
