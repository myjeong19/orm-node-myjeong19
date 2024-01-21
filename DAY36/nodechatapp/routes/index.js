var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var db = require('../models/index');

router.get('/', async (req, res, next) => {
  res.render('channel/chat', { layout: 'baseLayout' });
});

router.get('/entry', async (req, res, next) => {
  res.render('entry');
});

router.post('/entry', async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var encryptedPassword = await bcrypt.hash(password, 12);

  var member = {
    email: email,
    member_password: encryptedPassword,
    name: name,
    profile_img_path: '',
    telephone: '',
    entry_type_code: 0,
    use_state_code: 1,
    reg_date: Date.now(),
    reg_member_id: 0,
  };

  await db.Member.create(member);

  res.redirect('/login');
});

router.get('/login', async (req, res, next) => {
  res.render('login', { resultMsg: '' });
});

router.post('/login', async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var member = await db.Member.findOne({ where: { email: email } });
  var resultMsg = '';

  if (member == null) {
    resultMsg = '동일한 메일주소가 존재하지 않습니다.';
    res.render('login', { resultMsg });
  } else {
    var result = await bcrypt.compare(password, member.member_password);
    if (result) {
      res.redirect('/chat');
    } else {
      resultMsg = '암호가 일치하지 않습니다.';
      res.render('login', { resultMsg });
    }
  }
});

router.get('/find', function (req, res, next) {
  res.render('find');
});

router.post('/find', function (req, res, next) {
  res.render('find', { email: '', result: 'OK' });
});

router.get('/maketoken', async (req, res, next) => {
  var token = '';
  res.render('maketoken.ejs', { token, layout: false });
});

router.post('/maketoken', async (req, res, next) => {
  var token = '';

  var jsonTokenData = {
    userid: req.body.userid,
    email: req.body.email,
    usertype: req.body.usertype,
    name: req.body.name,
    telephone: req.body.telephone,
  };

  token = await jwt.sign(jsonTokenData, process.env.JWT_SECRET, {
    expiresIn: '24h',
    issuer: 'msoftware',
  });

  res.render('maketoken.ejs', { token, layout: false });
});

router.get('/readtoken', async (req, res, next) => {
  var token = req.query.token;

  var tokenJsonData = {};

  try {
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    token = '유효하지않은 토큰입니다.';

    var tokenJsonData = {
      userid: '',
      email: '',
      usertype: '',
      name: '',
      telephone: '',
    };
  }

  res.render('readtoken.ejs', { token, tokenJsonData, layout: false });
});

module.exports = router;
