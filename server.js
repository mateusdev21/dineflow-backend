require('dotenv').config();

const express = require('express');
const cors = require('cors');
const createHttpError = require('http-errors');
// const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('✅ Database connected successfully');
    }).catch((err) => {
        console.log('❎ Database connection failed:', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});

require('./app/routes/user.route')(app);
require('./app/routes/order.route')(app);
require('./app/routes/table.route')(app);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
});







