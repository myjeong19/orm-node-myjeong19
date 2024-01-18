// 사용자 로그인 여부 체크
exports.isLoggedIn = (req, res, next) => {
  if (req.session.loginUser) {
    next();
  } else {
    res.redirect('/login');
  }
};

// 로그인 상태가 아닌 경우, 특정 페이지 이동
// 혹은 로그인한 상태에서 회원 가입 페이지 접근 차단
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.loginUser) {
    next();
  } else {
    res.redirect('/login');
  }
};
