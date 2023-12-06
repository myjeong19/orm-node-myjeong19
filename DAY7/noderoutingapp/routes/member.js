var express = require('express');
var router = express.Router();

router.get('/join', (req, res) => res.render('member/join'));
router.get('/entry', (req, res) => res.render('member/entry'));
router.post('/entry', function (req, res) {
  res.redirect('/main');
});

module.exports = router;
