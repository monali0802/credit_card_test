const { check } = require('express-validator');

module.exports = {
    validateCardHoldername: check('name').not().isEmpty().withMessage('Card Holder Name should not be Empty.').isAlpha().withMessage('Card Holder Name should contain only Alphabets'),
    validateCardNumber: async(req, res, next) => {
            let cardNo = req.body.card_number;
            cardNo = cardNo.replace(/-/g, "");
            let sum = 0;
            for (let i = 0; i < cardNo.length; i++){
                let n =  cardNo.charAt(i) - '0';
                if (i % 2 == 0) {
                    n *= 2;
                    if (n > 9)
                    n -= 9;
                }
                sum += n;
            }
            if(sum % 10 != 0) {
                res.status(422).json({"error":"Card is not valid!"});
            } else {
                next();
            }
        },
    validateCardLimit:check('limit').isNumeric().withMessage('Card limit must be Numeric')
};