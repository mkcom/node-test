module.exports = new Contributors();

function Contributors() {

    this.get = function (req, res) {
        req.db.get('contributors').find({}, {}, function (e, data) {
            res.render('contributors', {
                "contributors": data
            });
        });
    };

    this.add = function (req, res) {
        req.db.get('contributors').insert({
            "username": req.body.username,
            "permalink": req.body.permalink
        }, function (err) {
            if (err) {
                res.status(500).send({
                    error: true,
                    msg: "There was a problem adding the information to the database."
                });
            } else {
                res.location("contributors").redirect("contributors");
            }
        });
    };

    this.remove = function (req, res) {
        var itemId = req.params.id;
        req.db.get('contributors').remove({ _id: itemId }, function (err) {
            if (err) {
                res.status(500).send({
                    error: true,
                    msg: "There was a problem removing document "+itemId+"."
                });
            } else {
                res.status(200).send({ error: false });
            }
        });
    };

    this.update = function (req, res) {

    };
}