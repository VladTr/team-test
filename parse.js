const express = require('express');
const router = express.Router();
const request = require('request');
var Iconv = require('iconv').Iconv;
var Court = require('../models/court');
var find = require('../functions/exeption');


router.get('/', function (req, response) {

    var fromEnc = 'cp1251';
    var toEnc = 'utf-8';
    var translator = new Iconv(fromEnc,toEnc);
    request(
        {
            url:'http://court.gov.ua/sud1501/',
            encoding:null
        },
        function(err,res,body){
            //console.log(translator.convert(body).toString());
            //response.send(translator.convert(body).toString());
            var record = find.findInParsedSie(translator.convert(body).toString());
            var newCourt = new Court({
                name:record.name,
                area:'',
                address: record.address,
                phone: record.phone,
                email: record.email
            });
            newCourt.save(function (err) {
                if (err){
                    res.setHeader('Content-Type', 'application/json');
                    res.json(err);
                    return console.log(err);
                }
            });
            response.send(record.name);
        }
    );
    //response.end();
});


module.exports = router;