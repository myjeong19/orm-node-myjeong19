var express = require('express');
var router = express.Router();

//로그인체크 미들웨어

//로그인 지속성 JWT 토큰 발급 체크
//사용자 토큰제공여부 체크 미들웨어 참조하기
var { tokenAuthChecking } = require('./apiMiddleware.js');

/* 
-기능: 채팅 메인 웹페이지 요청 및 응답 처리 라우팅 메소드
-호출주소: http://localhost:3000/chat
*/
router.get('/', function (req, res, next) {
  res.render('channel/chat.ejs', { layout: 'baseLayout' });
  //res.render('channel/chat.ejs',{layout:false});
});

module.exports = router;
