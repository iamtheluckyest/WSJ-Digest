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
        note.save({comment: req.body.comment, _id : req.body.commentId}, function(err, commentData){
                if (err) {
                    res.send(err);
                } else {
                    Article.findOneAndUpdate({_id : req.body.articleId}, {note: commentData._id})
                    .exec(function(err, articleData) {
                    if (err){
                        res.send(err);
                    } else {
                        res.redirect("/");
                    }
                    });
                };
            }
        );
    });

    app.get("/comment/:articleId", function(req, res) {
        // Finish the route so it finds one article using the req.params.id,
        Article.find({_id : req.params.articleId})
        // and run the populate method with "note",
        .populate("note")
        // then responds with the article with the note included
        .exec(function(err, data) {
            if (err) {
                res.send(err)
            } else {
                res.json(data[0])
            };
        });
    });

    app.delete("/comment/:commentId", function(req, res) {
        Note.deleteOne({_id: req.params.commentId}, function(err, data){
            if (err) {
                res.send(err)
            } else {
                res.end();
            }
        });
    });
};

