const options = require('../config/config');
const mongoose = require('mongoose');
var connection = mongoose.createConnection(options.mongoDatabase);
connection.on('error', function (err) {
    if (err)
        console.log('MongoDb connection error');
    connection.db.close();
    module.exports = false;
    return false;
});

var courtSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    area: {type: String, default: ''},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String}
});
var Court = connection.model('Court', courtSchema);
module.exports = Court;