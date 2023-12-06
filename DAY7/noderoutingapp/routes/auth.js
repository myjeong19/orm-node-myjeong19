/**
 * auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답 처리
 * 모든 라우터 파일은 기본 라우팅 주소 체계를 가진다.
 * http://localhost:3000/ 라우터 파일의 기본주소/ 라우팅 메소드의 주소
 * http://localhost:3000/auth/ 라는 기본 주소로 해당 라우터 파일내 모든 라우팅 메소드는 기본 주소를 받는다.
 */

var express = require('express');
var router = express.Router();

// 기능: 로그인 웹 페이지 사용자 요청과 응답 처리
// 호출 주소 /auth/login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// 기능: 로그인 웹 페이지에서 입력 값 받아와 로그인 처리하기
router.post('/login', (req, res) => {
  // STEP1: 사용자 로그인 페이지에서 입력한 메일 주소와 암호값 추출
  var email = req.body.email;
  var password = req.body.password;

  //   STEP2: 모델을 이용해, 저장된 값인지 체크

  //   STEP3: 저장된 값인 값인 경우, 메인 페이지로 이동

  // httpResponse 객체의 redirect()는 지정된 URL 체계로 사용자 웹 페이지 이동
  //   redirect(도메인 주소, 하위 주소)
  //   res.redirect('https://www.naver.com');
  res.redirect('/main');
});

// 로그아웃
router.get('/logout', (req, res) => {
  // STEP1: 로그아웃 처리

  // STEP2: 로그아웃 후, 이동할 페이지 처리
  res.redirect('/main');
});

module.exports = router;
