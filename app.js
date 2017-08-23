const express = require('express');
const app = express();
var url = require('url');
var http = require('http');
var https = require('https');
var request = require('request');
const util = require('util');
var exeption = require('./functions/exeption');
const parse = require('./routes/parse');

app.use(express.static(__dirname + "/public"));

app.use('/parse', parse);

app.get('/', function (request, response) {
    //response.send('index');
});


app.get('/test', function (request, responce) {
    var mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db){
        if(err){
            return console.log(err);
        }
        db.collection('users').find({name:'Vlad'}).toArray(function (err, result) {
            console.log(result);
            db.close();
        });
    });
    responce.send('test');
});

app.get('/post', function (request, response) {
    // var postData = {};
    var post_options = {
        host: 'court.gov.ua',
        // port: '80',
        path: '/sudova-vlada/sudy/search_court.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Length': Buffer.byteLength(postData)
        }
    };

    // Set up the request
    http.request(post_options, function(res) {
        console.log('9999');
        console.log(res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    response.send('post1');
});


app.get('/post2', function (req, res) {

    res.header("Content-Type", "application/json; charset=utf-8");
    request.get(
        'http://court.gov.ua',
        { json: { key: 'value' },
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
        },
        function (error, response, body) {
            if (error){
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            }
            console.log(response.statusCode);
        }
    );

    //response.send('post2');
});

app.get('/googleapi', function (request, response) {
    var str = '';
    var result = '';
    var areaType = '';
    //var address = 'Одесса, ул. Ланжероновская 21 кв. 9';
    var address = url.parse(request.url, true).query['address'];
    console.log(address);
    var link = 'https://maps.googleapis.com/maps/api/geocode/json?language=ru&key=' +
        'AIzaSyA0T7SVH1AEv_8_7mcQ0XRY2RhUUtOopWM&address='+ encodeURI(address);
    https.get(link, function (res, err) {
        if (err){
          return console.log(err);
        }
        res.on('data', function (chunk) {
            str+=chunk;
        });
        res.on('end', function () {
           var myObjectResults = JSON.parse(str);
           if (myObjectResults.results[0]) {
               console.log(util.inspect(myObjectResults, {depth: null}));
               myObjectResults.results[0].address_components.forEach(function (record) {


                   // Район в области. Например: Арцизский район Одесской области
                   if(record.types.indexOf("administrative_area_level_2") !== -1){
                       result = record.long_name;
                       areaType = 'район в области';
                       console.log('administrative_area_level_2 : '+record.long_name);

                   }


                   // Район в городе. Например: Малиновский район г. Одессы
                   if(record.types.indexOf("sublocality_level_1") !== -1){
                       result = record.long_name;
                       areaType = 'район в городе';
                       console.log('sublocality_level_1  :  '+record.long_name);
                   }


                   // Город-район (мiськрайон) Например: г. Белгород-Днестровский
                   if(record.types.indexOf("locality") !== -1 && areaType === ''){
                       var check = exeption.test(record.long_name);
                       if (check !== ''){
                           console.log('check is '+check);
                           result = check;
                       } else {
                           result = record.long_name;
                           areaType = 'город в области';
                           console.log('locality : '+record.long_name);
                       }
                   }


               });

           } else {
               result = 'Получить район не удалось';
           }
           response.send(result);
           console.log(areaType);
        });
        console.log('Response is '+res.statusCode);

    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
