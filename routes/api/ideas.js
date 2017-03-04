var config = require('config.json');
var express = require('express');
var router = express.Router();
var db = require('db');

router.get('/', getAllIdeas);
router.post('/', createIdea);
router.delete('/:id', deleteIdea);

module.exports = router;

function getIdeas(req, res) {
  db.query('SELECT id, text FROM ideas ORDER BY id ASC;')
  .on('end', function(result) {
    res.status(200).send(result.rows);
  })
  .on('error', function(err) {
    res.status(404).send();
  });
};

function getAllIdeas(req, res) {
  getIdeas(req, res);
}

function createIdea(req, res) {
  db.query('INSERT INTO ideas(text) VALUES ($1);', [req.body.text])
  .on('end', function(data) {
    getIdeas(req, res);
  })
  .on('error', function(err) {
    res.status(404).send();
  });
}

function deleteIdea(req, res) {
  db.query('DELETE FROM ideas WHERE id=$1;', [req.params.id])
  .on('end', function(result) {
    getIdeas(req, res);
  })
  .on('error', function(err) {
    res.status(404).send();
  });
}