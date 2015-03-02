module.exports = Index;

function Index(req, res) {
    res.render('index', {
        title: 'KLANGEXTASE'
    });
}
