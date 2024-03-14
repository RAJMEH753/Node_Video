const express = require("express");
const mongoose = require("mongoose");

const route = require("./route");

const PORT = 5500;
const HOSTNAME = "localhost";

// Request Management
const app = express();
app.use(express.json());        // A body Parser Required to post a data

app.use('/', route);

// DB
const MongoAtlas = "mongodb+srv://admin:RDjBkS9LOJASnaXQ@zomato-clone-80.mpz4sy2.mongodb.net/mini_Project_3?retryWrites=true&w=majority&appName=zomato-clone-80";

mongoose.connect(MongoAtlas, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));