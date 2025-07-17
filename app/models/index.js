const dbConfig = require('../../config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL;
db.users = require('./user.model')(mongoose);
db.orders = require('./order.model')(mongoose);
db.tables = require('./table.model')(mongoose);

module.exports = db;