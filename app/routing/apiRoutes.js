var friends = require("../data/friends.js");

module.exports = function(app) {
    // Gets friends list
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // Adds friend to friends list and returns best match
    app.post("/api/friends", function(req,res) {
        var differences = [];
        var thisUser = req.body;
        if (friends.length > 2) {
            friends.forEach(function(user) {
                var totalDifference = 0;
                for (var i =0; i < thisUser.scores.length; i++) {
                    var otherAnswer = user.scores[i];
                    var thisAnswer = thisUser.scores[i];
                    var difference = otherAnswer - thisAnswer;
                    totalDifference += Math.abs(difference);
                }
                differences.push(totalDifference);
            });

            var minimumDifference = Math.min.apply(null, differences);
            var bestMatches = [];
            for (var i=0; i < differences.length; i++) {
                if (differences[i] === minimumDifference) {
                    bestMatches.push(friends[i]);
                }
            }

            res.json(bestMatches);
        } else {
            res.json(friends);
        }
        friends.push(thisUser);
    });
};