var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var request = require("request");

module.exports = function(app) {

    app.get("/scrape", function(req, res) {
        request("https://www.wsj.com/", function(error, response, html) {
            var $ = cheerio.load(html);
            $(".wsj-card").each(function(i, element) {
        
                var result = {};
                result.title = $(this).find(".wsj-headline-link").text();
                result.link = $(this).find(".wsj-headline-link").attr("href");
                result.description = $(this).find(".wsj-summary span:first-child").text()
                if (result.title && result.link && result.description){
                    var entry = new Article(result);
            
                    entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                    });
                }
            });
        });
        res.send("Scrape Complete");
    });
}