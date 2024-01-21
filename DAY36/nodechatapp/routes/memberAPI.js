var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
var jwt = require('jsonwebtoken');
var db = require('../models/index');

var { tokenAuthChecking } = require('./apiMiddleware.js');

router.post('/entry', async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    msg: '',
  };

  try {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var telephone = req.body.telephone;

    var existMember = await db.Member.findOne({ where: { email } });

    if (existMember != null) {
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.msg = 'ExistDoubleEmail';
    } else {
      var encryptedPassword = await bcrypt.hash(password, 12);

      var encryptedTelephone = AES.encrypt(
        telephone,
        process.env.MYSQL_AES_KEY
      );

      var member = {
        email,
        member_password: encryptedPassword,
        name,
        profile_img_path: '',
        telephone: encryptedTelephone,
        entry_type_code: 1,
        use_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: 0,
      };

      var registedMember = await db.Member.create(member);

      registedMember.member_password = '';
      registedMember.telephone = AES.decrypt(
        registedMember.telephone,
        process.env.MYSQL_AES_KEY
      );

      apiResult.code = 200;
      apiResult.data = registedMember;
      apiResult.msg = 'ok';
    }
  } catch (err) {
    console.log('서버에러발생-api/member/entry: ', err.message);

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'failed';
  }

  res.json(apiResult);
});

router.post('/login', async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    msg: '',
  };

  try {
    var email = req.body.email;
    var password = req.body.password;

    var member = await db.Member.findOne({ where: { email: email } });

    var resultMsg = '';

    if (member == null) {
      resultMsg = 'not exist email';

      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    } else {
      var compareResult = await bcrypt.compare(
        password,
        member.member_password
      );

      if (compareResult) {
        resultMsg = 'login ok';

        member.member_password = '';

        member.telephone = AES.decrypt(
          member.telephone,
          process.env.MYSQL_AES_KEY
        );

        var memberTokenData = {
          member_id: member.member_id,
          email: member.email,
          name: member.name,
          profile_img_path: member.profile_img_path,
          telephone: member.telephone,
          etc: '기타정보',
        };

        var token = await jwt.sign(memberTokenData, process.env.JWT_SECRET, {
          expiresIn: '24h',
          issuer: 'msoftware',
        });

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = resultMsg;
      } else {
        resultMsg = 'not correct password';

        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = resultMsg;
      }
    }
  } catch (err) {
    console.log('서버에러발생-api/member/login: ', err.message);

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'failed';
  }

  res.json(apiResult);
});

router.post('/find', async (req, res, next) => {
  res.json();
});

router.get('/profile', tokenAuthChecking, async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    msg: '',
  };

  try {
    var token = req.headers.authorization.split('Bearer ')[1];

    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);
    var loginMemberId = tokenJsonData.member_id;
    var loginMemberEmail = tokenJsonData.email;

    var dbMember = await db.Member.findOne({
      where: { member_id: loginMemberId },
      attributes: [
        'email',
        'name',
        'profile_img_path',
        'telephone',
        'birth_date',
      ],
    });

    dbMember.telephone = AES.decrypt(
      dbMember.telephone,
      process.env.MYSQL_AES_KEY
    );

    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.msg = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'falied';
  }

  res.json(apiResult);
});

module.exports = router;
