const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db');
const PORT = process.env.PORT || 8000 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/card", require('./routes/card'));


connection.connect(err => {
    if(err){
        return err;
    }
});

app.listen(PORT, () => {
    console.log(`Credit card app is running on ${PORT}`)
})