var express = require('express');
var router = express.Router();

const db = require('../models/index');

/* GET home page. */
router.post(
  '/login',
  async (req, res, next) => {
    const apiResult = {
      code: 200,
      date: null,
      result: '',
    };

    try {
      const { email, password } = req.body;
      const member = await db.Member.findOne({ where: { email: email } });
      let resultMessage = '';
      if (member === null) {
        // 해당 유저가 없는 경우
        resultMessage = '동일한 메일 주소가 존재하지 않습니다.';
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.result = resultMessage;
        res.json(apiResult);
      } else {
        if (member.password === password) {
          // 조회된 메일의 패스워드와 입력한 패스워드가 일치하는 경우
          resultMessage = '로그인 성공';
          apiResult.code = 200;
          apiResult.data = member;
          apiResult.result = resultMessage;
          res.json(apiResult);
          res.redirect('/');
        } else {
          resultMessage = '유효한 패스워드를 입력해주세요.';
          apiResult.code = 400;
          apiResult.data = null;
          apiResult.result = resultMessage;
          res.json(apiResult);
        }
      }
    } catch (error) {
      resultMessage = '서버 에러 발생';
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.result = resultMessage;
    }
  }

  //   DB에서 동일 메일 주소 사용자 정보 조회
  //   SELECT * FROM members WHRER email= 'user mail'
);

module.exports = router;
