var Article = require("../models/Article");
var Note = require("../models/Note")

module.exports = function(app) {
    app.get("/", function(req, res) {
        Article.find({}, function(err, data) {
            if (err) {
              res.send(err);
            } else {
                res.render("index", {articles : data})
            };
          });
        
    });

    app.post("/comment", function(req, res){
        var note = new Note(req.body)
        note.save({comment: req.body.comment}, function(err, commentData){
            if (err) {
                res.send(err);
            } else {
                console.log(req.body.articleId)
                Article.findOneAndUpdate({_id : req.body.articleId}, {note: commentData._id})
                .exec(function(err, articleData) {
                  if (err){
                    res.send(err);
                  } else {
                    res.redirect("/");
                  }
                });
            }
        })
    });

    app.get("/comments", function(req, res) {
        
    })
};

