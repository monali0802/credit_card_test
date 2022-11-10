Go to the project directory then run

npm install

Start server run

npm index.js or nodemon index.js

Change the database credentials in /config/db.js


Used 8000 port so url is http://localhost:8000


There are two rest api:

Get all detail of cards:

url: http://localhost:8000/card/all

method: GET


Add credit card detail:

url: http://localhost:8000/card/add_card

method: POST

body: {
    "name": "Monali",
    "limit": "50",
    "card_number": "4417-1234-5678-9113",
    "balance": 0
}
