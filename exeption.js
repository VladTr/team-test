const cheerio = require('cheerio');
const request = require('postman-request');
var iconv = require('iconv-lite');
var Court = require('../models/court');


var test = function(cityName) {
    var cityExeptStorage = [{city:'Котовск', area:'Котовский район'},
        {city:'Подольск', area:'Подольский район'},
        {city:'Белгород-Днестровск', area:'Белгород-Днестровский район'}];
    var result = '';
    cityExeptStorage.forEach(function (item) {
        if (item.city.indexOf(cityName) !== -1){
            console.log('changed area to:  '+item.area);
            result = item.area;
        }
    });
    return result;
};

var findInParsedSie = function (body) {
    const $ = cheerio.load(body);
    // const courtName = ($('div.ust span').text()).trim();
    // const courtAddress = ($('div.col-xs-7.banners div.col-xs-24').children().eq(2).text()).trim();
    // const courtSite = ($('div.col-xs-7.banners div.col-xs-24').children().eq(3).text()).trim();
    // const courtEmail = ($('div.col-xs-7.banners div.col-xs-24').children().eq(4).text()).trim();
    // const courtPhone = ($('div.col-xs-7.banners div.col-xs-24').children().eq(5).text()).trim();
    var courtInfo = {
        name: ($('div.ust span').text()).trim(),
        address: ($('div.col-xs-7.banners div.col-xs-24').children().eq(2).text()).trim(),
        site: ($('div.col-xs-7.banners div.col-xs-24').children().eq(3).text()).trim(),
        email: ($('div.col-xs-7.banners div.col-xs-24').children().eq(4).text()).trim(),
        phone: ($('div.col-xs-7.banners div.col-xs-24').children().eq(5).text()).trim(),
    };
    //console.log(courtInfo.phone);
    return courtInfo;
};

var postAndSave = function (formData, headers, key, region) {
    request.post({
        url:'http://court.gov.ua/sudova-vlada/sudy',
        form:formData,
        headers: headers
    }, function (err, httpResponse, body) {
        if (err) {
            console.log(err);
        }
        if (httpResponse){
            //console.log(httpResponse.headers.location);

            request(
                {
                    url:httpResponse.headers.location,
                    encoding:null
                },
                function(err,res,body){

                    //console.log(translator.convert(body).toString());
                    //response.send(translator.convert(body).toString());
                    var record = findInParsedSie((iconv.decode(body, 'win1251')).toString());
                    //var record = iconv.decode(body, 'win1251');
                    //console.log(buf);
                    //var record = body.toString();
                    //console.log(record);
                    console.log(record.name);
                    var newCourt = new Court({
                        name:record.name,
                        area:region,
                        address: record.address,
                        phone: record.phone,
                        email: record.email
                    });

                    newCourt.save(function (err) {
                        if (err){
                            //res.setHeader('Content-Type', 'application/json');
                            //res.json(err);
                            return console.log(err);
                        }
                    });
                }
            );
        }
    });



};


module.exports.findInParsedSie = findInParsedSie;
module.exports.test = test;
module.exports.postAndSave = postAndSave;