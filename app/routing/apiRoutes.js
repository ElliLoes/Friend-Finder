var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req,res) {
        var differences = [];
        var thisUser = req.body;
        if (friends.length > 1) {
            friends.forEach(function(user) {
                var totalDifference = 0;
                for (var i =0; i < thisUser.length; i++) {
                    var otherAnswer = user.answers[i];
                    var thisAnswer = thisUser.answers[i];
                    var difference = +otherAnswer - +thisAnswer;
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