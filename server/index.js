const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const routes = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

mongoose
    .connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((conn) => console.log("mongoose running", conn.connection.host))
    .catch((err) => console.log("mongoose ERROR", err));

// middlewares
app.use(cors());
app.use(express.json());


app.use("/", routes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!', err)
  })

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});