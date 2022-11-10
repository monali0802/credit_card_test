const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card');
const cardCheck = require('../middlewares/card');

router.get('/all', cardController.getAllCards);
router.post('/add_card', [cardCheck.validateCardNumber, cardCheck.validateCardHoldername, cardCheck.validateCardLimit], cardController.addCard);

module.exports = router;