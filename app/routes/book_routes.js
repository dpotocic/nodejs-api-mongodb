var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/books/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('books').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/books', (req, res) => {
        const book = { isbn: req.body.isbn, title: req.body.title };
console.log(book);
        db.collection('books').insert(book, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};