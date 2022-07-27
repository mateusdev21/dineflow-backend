const { MongoClient, ObjectId } = require('mongodb');
require('dotenv/config');
const express = require('express');
const app = express();

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/", (req, res) => {
    client.connect((error, client) => {
        if (error) {
            return console.log("Connection failed");
        }
        const db = client.db();
        db.collection("users")
            .find()
            .toArray((error, result) => {
                if (error) {
                    return console.log("Data not found");
                }
                res.send(result);
            });
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running http://localhost:${process.env.APP_PORT}`);
  });

