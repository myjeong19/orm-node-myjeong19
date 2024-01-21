exports.isLoggedIn = (req, res, next) => {
  if (req.session.loginUser != undefined) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (req.session.loginUser == undefined) {
    next();
  } else {
    res.redirect('/');
  }
};
