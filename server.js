require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require ('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
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

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});







