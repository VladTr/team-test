const express = require('express');
const router = express.Router();
const fs = require('fs');
var csvjson = require('csvjson');
var path = require('path');
var iconvlite = require('iconv-lite');


router.get('/', function (req, res) {
    //var data = fs.readFileSync(path.join(__dirname, '../regions/houses.csv'), { encoding : 'utf8'});
    var data = readFileSync_encoding(path.join(__dirname,'../regions/houses.csv'), 'win1251');
    var options = {
        delimiter : ';', // optional
        quote     : '"' // optional
    };
    var obj = csvjson.toObject(data, options);
    var arr =csvjson.toArray(data, options);
    console.log(obj[9]['№ будинк']);
    var nums = obj[9]['№ будинк'].split(',');
    for (var i=0; i<nums.length; i++){
        console.log(nums[i]);
    }
    res.send('read');
});

function readFileSync_encoding(filename, encoding) {
    var content = fs.readFileSync(filename);
    return iconvlite.decode(content, encoding);
}


module.exports = router;
