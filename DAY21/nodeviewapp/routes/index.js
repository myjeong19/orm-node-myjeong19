var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('index.ejs');
});

router.get('/login', async (req, res, next) => {
  res.render('login.ejs');
});

module.exports = router;
