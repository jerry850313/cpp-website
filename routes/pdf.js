var express = require('express');
var router = express.Router();
var path = require('path');

/* GET PDF viewer page. */
router.get('/', function(req, res, next) {
  res.render('pdf', { title: 'PDF Lectures' });
});

/* GET specific PDF */
router.get('/:filename', function(req, res, next) {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../public/pdfs', filename);
  res.sendFile(filePath);
});

module.exports = router;
