const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();

router.post('/', (req, res) => {
    fetchScrapping(req, res)
});

/*************************************** Function List **********************************************/

function fetchScrapping(req, response) {
    let url = req.body.url;

    request(url, function (err, res, body) {
        // if (err && res.statusCode !== 200) throw err;
        var desc = []
        var name;
        var Nprc;
        var Oprc;
        var img;
        let $ = cheerio.load(body);

        $('.product-info__description').each((i, value) => {
            $(value).find('p').each((j, data) => {
                var obj = {}
                obj["desc"+j] = $(data).text()
                desc.push(obj)
            });
        });
        name = $('.product-info-main .page-title-wrapper .page-title span').text()

        img = $('#maincontent > div.columns > div > section.product-info__section.clearfix > div > div:nth-child(2) > div:nth-child(2) > img').attr("class")
        console.log("image: " , img)
        Nprc = parseInt($('.product-info-main .price-box .price-wrapper').attr('data-price-amount'))
        Oprc = parseInt($('.product-info-main .price-box .old-price .price-wrapper').attr('data-price-amount'))
       
        response.send({title : name , description : desc, Newprice: Nprc ,OldPrice: Oprc, image : img})
    })
}

module.exports = router;