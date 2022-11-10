const connection = require("../db");
const {validationResult} = require('express-validator')


module.exports = {
    addCard: async(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(200).json(errors)
        } else {
            let name = req.body.name;
            let cnumber = req.body.card_number;
            let climit = req.body.limit;

            connection.query(`SELECT * FROM card_detail where card_number = ?` , [cnumber], (err, row) => {
                if (err) {
                  res.status(500).json({
                      error: "Internal server error",
                      code: 500
                  });
                };
                if(row && row.length > 0 && row[0].id != '' && row[0].card_number == cnumber) {
                    res.status(200).json({"error":"Card number already exists in database"});
                } else{
                    let query = `INSERT INTO card_detail (name, card_number, card_limit, balance) VALUES ('${name}', '${cnumber}', '${climit}', 0)`;
                    connection.query(query, function (err, result) {
                        if (err) {
                            res.status(200).json({
                            error: err,
                            });
                        }
                        else {
                            res.status(200).json(
                                {
                                "id":result.insertId,
                                "name":name,
                                "card_number":cnumber,
                                "card_limit":climit,
                                "balance":0
                                }
                            );
                        }
                    });
                } 
            });
        }
        
    },
    getAllCards: async(req, res, next) => {
        connection.query(`SELECT * FROM card_detail`, (err, rows) => {
            if (err) {
              res.status(500).send({
                  error: "Internal server error",
                  code: 500
              });
            };
            if(rows && rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(200).json({"message": "No records available"});
            }
        });
    }
}
