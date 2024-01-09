var express = require('express');
var router = express.Router();
const db = require('../models/index');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/login', async (req, res, next) => {
  res.render('login', { layout: false, resultMessage: '' });
});

router.post('/login', async (req, res, next) => {
  const { admin_id, password } = req.body;
  let resultMessage = '';

  const member = await db.Admin.findOne({ where: { admin_id } });

  const passwordResult = await bcrypt.compare(
    password,
    member.admin_member_password
  );

  if (passwordResult) {
    res.redirect('/');
  }

  if (!member) {
    resultMessage = '동일한 아이디가 존재하지 않습니다.';
    res.render('login', { layout: false, resultMessage });
  } else {
    resultMessage = '비밀번호가 일치하지 않습니다.';
    res.render('login', { layout: false, resultMessage });
  }
});

module.exports = router;
