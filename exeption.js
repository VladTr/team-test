const cheerio = require('cheerio');
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

module.exports.findInParsedSie = findInParsedSie;
module.exports.test = test;