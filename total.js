const express = require('express');
const router = express.Router();
const request = require('postman-request');
var iconv = require('iconv-lite');
var Court = require('../models/court');
var find = require('../functions/exeption');
var post = require('../functions/exeption');

var court_type = 6;   // 5-районы в области      6-міськрайонні         8 - районы в городе

router.get('/', function (req, res) {
    res.send('total');

    // var odessaRegion = {
    //     c222:'Ананьївський',
    //     c223:"Арцизький",
    //     c224:"Балтський",
    //     c225:"Березівський",
    //     c226:"Біляївський",
    //     c227:"Болградський",
    //     c228:"Великомихайлівський",
    //     c229:"Іванівський",
    //     c230:"Кілійський",
    //     c231:"Кодимський",
    //     c232:"Комінтернівський",
    //     c233:"Красноокнянський",
    //     c234:"Любашівський",
    //     c235:"Миколаївський",
    //     c236:"Овідіопольський",
    //     c237:"Ренійський",
    //     c238:"Роздільнянський",
    //     c239:"Савранський",
    //     c240:"Саратський",
    //     c241:"Тарутинський",
    //     c242:"Татарбунарський",
    //     c243:"Фрунзівський",
    //     c244:"Ширяївський"
    // };

    // var odessaRegion = {
    //     c71:"Київський",
    //     c72:"Малиновський",
    //     c73:"Приморський",
    //     c74:"Суворовський"
    // };

    var odessaRegion = {
        с47:"Білгород-Дністровський",
        с48:"Ізмаїльський",
        с49:"Котовський"
    };


   for (key in odessaRegion){
       var code = key.slice(1);
       var region = odessaRegion[key];

       var formData = {
           reg_id:code,
           court_type:court_type,
           foo1: 15,
           foo2: 73,
           goto:''
       };
       var headers = {
           'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
           'Content-Type' : 'application/x-www-form-urlencoded'
       };
       post.postAndSave(formData, headers, key, region);

   }

});

module.exports = router;
