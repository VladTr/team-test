const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function (req, res) {
    var formData = {
        reg_id: 222,
        court_type:5,
        foo1: 15
    };
    request.post({url:'http://court.gov.ua/sudova-vlada/sudy', formData:formData }, function (err, httpResponse, body) {
        if (err) {
            console.log(err);
        }
        if (httpResponse){
            //console.log(httpResponse);
            res.send(httpResponse);
        }
        if (body){
            console.log('b');
        }

    });

});

module.exports = router;