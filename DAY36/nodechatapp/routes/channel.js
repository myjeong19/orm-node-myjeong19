var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('channel/chat', { layout: 'baseLayout' });
});

module.exports = router;
