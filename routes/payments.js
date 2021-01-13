const express = require('express');
const router = express.Router();
const Openpay = require('openpay');
/* GET users listing. */
router.get('/', (req, res, next) => {
  const openpay = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  openpay.charges.list((error, list) => {
    if (error) {
      console.error(error);
      res.status(403).send('Openpay error');
    } else {
      console.log(list);
      res.send(list);
    }
  });
});

router.post('/', (req, res, next) => {
  const { customers } = new Openpay(process.env.OPEN_PAY_ID, process.env.OPEN_PAY_SK, false);
  const {card_number, expiration, cvv2, device_session_id, description, amount} = req.body;
  const cardRequest = {
    card_number,
    holder_name: req.body.customer,
    expiration_year: expiration.split('/')[1],
    expiration_month: expiration.split('/')[0],
    cvv2,
    device_session_id
  };
  customers.cards.create(req.body.customer, cardRequest, (cardError, card) => {
    if (cardError) {
      console.error(cardError);
      res.status(403).send('Openpay error');
    } else {
      console.log(card);
      const chargeRequest = {
        source_id : card.id,
        method : 'card',
        currency : 'MXN',
        amount,
        description,
        device_session_id,
     }
     customers.charges.create(req.body.customer, chargeRequest, (chargeError, charge) => {
      if (chargeError) {
        console.error(chargeError);
        res.status(403).send('Openpay error');
      } else {
        console.log(charge);
       }
     });
    }
  });
});

module.exports = router;
