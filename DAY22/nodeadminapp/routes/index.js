const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/login', async (req, res) => res.render('login'));

router.post('/login', async (req, res) => {
  res.redirect('main');
});

router.get('/main', async (req, res) => res.render('main'));

module.exports = router;
