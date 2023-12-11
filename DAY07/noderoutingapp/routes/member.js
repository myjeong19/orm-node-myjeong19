/**
 * 기능 : 각종 회원정보 요청과 응답 라우팅 파일
 * 약관 페이지 요청과 응답, 회원 가입 웹 페이지 요청과 응답
 * http://localhost:3000/member/...
 *
 * 사용자가 링크 클릭이나 URL을 직접 입력한 주소가 http://localhost:3000/member/~ 일 경우,
 *  노드앱의 app.js의 참조된 라우터 파이 중 해당 /member/ 기본 주소를 관리하는 해당 라우터 파일을 먼저 찾고
 * 그 다음에 사용자가 욫어한 /memebr/... 라우텡 메소드 주소로 바인딩 된 라우팅 메소드를 찾아
 * 요청과 응답을 해당 라우팅 메소드에서 처리해준다.
 */

var express = require('express');
var router = express.Router();

router.get('/join', (req, res) => res.render('member/join'));
router.get('/login', (req, res) => res.render('member/login'));
router.post('/login', (req, res) => {
  // STEP1 : 사용자가 입력한 회원가입 정보 추출
  var email = req.body.email;
  var password = req.body.password;

  // STEP2: DB에 member 테이블에 동이랗ㄴ 사용자 메일 주소가 있는지 체크한다.

  // STEP3: 메일주소 중복이 없는 경우, 신규 회원으로 사용자 정보를 member테이블에 저장한다.
  var member = {
    email,
    password,
  };

  res.redirect('/main');
});
router.get('/begin', (req, res) => res.render('member/begin'));
router.post('/begin', (req, res) => {
  res.redirect('/main');
});
// redirect: URL
// render: Views 파일 물리적 경로

module.exports = router;
// 404 없는 주소 혹은, 개발자의 리소스 실수 혹은 사용자의 오타
// 505 서버 기능 자체 에러 개발자의 100% 책임
