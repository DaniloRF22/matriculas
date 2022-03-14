var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({'Version': '1.0', 'Aplication': 'matricula backend'});
});

module.exports = router;
