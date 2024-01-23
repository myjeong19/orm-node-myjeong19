var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
var jwt = require('jsonwebtoken');
var db = require('../models/index');
require('dotenv').config();

var { tokenAuthChecking } = require('./apiMiddleware.js');

//! 각종 열거형 상수 - 코드성 데이터 참조
const constants = require('../common/enum.js');

router.post('/entry', async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    msg: '',
  };

  try {
    const { email, password, name, telephone } = req.body;

    const getExistMember = await db.Member.findOne({ where: { email } });

    if (getExistMember != null) {
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.msg = 'ExistDoubleEmail';
    } else {
      const encrypteEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
      var encryptedPassword = await bcrypt.hash(password, 12);
      var encryptedTelephone = AES.encrypt(
        telephone,
        process.env.MYSQL_AES_KEY
      );

      var member = {
        email: encrypteEmail,
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

    const encrypteEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
    const getMember = await db.Member.findOne({
      where: { email: encrypteEmail },
    });
    let resultMsg = '';

    if (getMember == null) {
      resultMsg = 'not exist email';
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    } else {
      var compareResult = await bcrypt.compare(
        password,
        getMember.member_password
      );

      if (compareResult) {
        resultMsg = 'login ok';
        getMember.member_password = '';
        getMember.telephone = AES.decrypt(
          getMember.telephone,
          process.env.MYSQL_AES_KEY
        );

        var memberTokenData = {
          member_id: getMember.member_id,
          email: getMember.email,
          name: getMember.name,
          profile_img_path: getMember.profile_img_path,
          telephone: getMember.telephone,
          etc: '기타정보',
        };

        var token = await jwt.sign(memberTokenData, process.env.JWT_SECRET, {
          expiresIn: '24h',
          issuer: 'myjeong19',
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

    dbMember.email = AES.decrypt(dbMember.email, process.env.MYSQL_AES_KEY);

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

/**
 * *TODO
 * GET
 * 전체 회원 목록 조회
 */

router.get('/all', tokenAuthChecking, async (req, res) => {
  var apiResult = {
    code: 400,
    data: null,
    msg: '',
  };

  try {
    var members = await db.Member.findAll({
      attributes: [
        'member_id',
        'email',
        'name',
        'profile_img_path',
        'telephone',
      ],
      where: { use_state_code: constants.USE_STATE_CODE_USED },
    });

    apiResult.code = 200;
    apiResult.data = members;
    apiResult.msg = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = 'Failed';
  }

  res.json(apiResult);
});

module.exports = router;
