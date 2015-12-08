/*jshint node:true,expr:true*/
'use strict';

var spashttp = require("spas-http");
var request = require('request');
var cheerio = require('cheerio');

exports.companyScrape = function(params, credentials, cb){
  var options = {
    "url": params.url,
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3"
    }
  };

  request(options, function(err, response, body) {
    var $ = cheerio.load(body);
    var items = [];
    $('li.feed-item').each(function(idx,li){
      if (params.count && idx < params.count) {
        var $li = $(this);
        var item = {};
        item.id = $li.attr('data-li-update-id');
        item.date = $li.attr('data-li-update-date');
        // item.niceDate = new Date(parseInt(this.datestamp)).toISOString();
        var $img = $li.find('img').first();
        item.image = {};
        item.image.src = $img.attr('src') || $img.attr('data-li-lazy-load-src');
        item.image.alt = $img.attr('alt');

        item.content = $li.find('.share-body').text();
        items.push(item);
      } else {
        return false;
      }
    });
    cb(err, items);
  });
};

exports.companyFeed = function(params, credentials, cb){
  if (params.access_token) {
    params.oauth2_access_token = credentials.access_token;
  }
  spashttp.request(params, credentials, function (err, response) {
    cb(err, response);
  });
};
