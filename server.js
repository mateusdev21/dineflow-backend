require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Database Connected');
    }).catch((err) => {
        console.log(err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});

require('./app/routes/user.route')(app);
require('./app/routes/book.route')(app);

app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});







