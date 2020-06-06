const shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res) {
  res.render('books/index',
    { books: db.get('books').value() }
  );
}

module.exports.create = function(req, res) {
  res.render('books/create');
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  var book = db.get('books').find({ id: id }).value();
  res.render('books/update', {
    book: book
  });
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write();
  res.redirect('back');
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
}

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  db.get('books').find({ id: id }).assign({ title: req.body.title }).write();
  res.redirect('/books');
}