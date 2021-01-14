const router = require('express').Router();
const Openpay = require('openpay');

router.get('/', (req, res) => {
  const { charges } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  charges.list((error, list) => {
    if (error) {
      res.status(403).send(error.description);
    } else {
      res.send(list);
    }
  });
});

router.get('/balance', (req, res) => {
  const { merchant } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  merchant.get(function (error, merchant) {
    if (error) {
      res.status(403).send(error.description);
    } else {
      res.send(merchant);
    }
  });
});

router.post('/', (req, res) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  const { card_number, expiration, cvv2, device_session_id, description, amount, holder_name } = req.body;
  const cardRequest = {
    card_number,
    holder_name,
    expiration_year: expiration.split('/')[1],
    expiration_month: expiration.split('/')[0],
    cvv2,
    device_session_id
  };
  customers.cards.create(req.body.customer, cardRequest, (cardError, card) => {
    if (cardError) {
      res.status(403).send(cardError.description);
    } else {
      const chargeRequest = {
        source_id: card.id,
        method: 'card',
        currency: 'MXN',
        order_id: `oid-${Math.floor(Math.random() * 100) + 1}`,
        amount,
        description,
        device_session_id,
      }
      customers.charges.create(req.body.customer, chargeRequest, (chargeError, charge) => {
        if (chargeError) {
          res.status(403).send(chargeError.description);
        } else {
          res.send(charge);
        }
      });
    }
  });
});

module.exports = router;
