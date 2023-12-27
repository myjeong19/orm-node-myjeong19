const express = require('express');
const router = express.Router();

//Model영역에서 db객체 참조하기
const db = require('../models/index');

/* GET home page. */
router.get('/entry', async (req, res, next) => {
  res.render('member/entry');
});

//회원가입 웹페이지 응답처리
//http://localhost:3000/member/entry
router.post('/entry', async (req, res, next) => {
  //step1: 회원가입정보 추출하기
  const { email, password } = req.body;

  //step2: 데이터 베이스에 members테이블 데이터를 저장한다.
  const member = { email, password };

  //step3:db에 저장하고 저장된 값을 반환받는다.
  //db.Member.create()는 ORM 프레임워크에 의해서 백엔드에서
  //INSERT INTO members(email,password,createdAt)Values('사용자가입력한메일주소','암호',now());
  //SQL쿼리가 만들어져서
  //MYSQL DB서버로 전달되어 데이터가 입력되고 입력된 데이터를 MYSQL서버에서 반환해준다.
  const savedMember = await db.Member.create(member);

  res.redirect('/');
});

router.get('/login', async (req, res, next) => {
  res.render('member/login', { resultMessage: '', email: '', password: '' });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  //   DB에서 동일 메일 주소 사용자 정보 조회
  //   SELECT * FROM members WHRER email= 'user mail'
  const member = await db.Member.findOne({ where: { email: email } });
  let resultMessage = '';
  if (member === null) {
    // 해당 유저가 없는 경우
    resultMessage = '동일한 메일 주소가 존재하지 않습니다.';
  } else {
    if (member.password === password) {
      // 조회된 메일의 패스워드와 입력한 패스워드가 일치하는 경우
      res.redirect('/');
    } else {
      resultMessage = '유효한 패스워드를 입력해주세요.';
    }
  }
  if (resultMessage !== '') {
    res.render('member/login', { resultMessage, email, password });
  }
});

module.exports = router;
