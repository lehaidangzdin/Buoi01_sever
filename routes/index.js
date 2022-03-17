var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
//
router.get('/asia', function(req, res, next) {
  res.render('Asian', { title: 'Asia' });
});
//
router.get('/euro', function(req, res, next) {
  res.render('Euro', { title: 'Euro' });
});
//
router.get('/america', function(req, res, next) {
  res.render('American', { title: 'America' });
});
//
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
router.get('/hot', function(req, res, next) {
  res.render('hot', { title: 'Hot' });
});



module.exports = router;
