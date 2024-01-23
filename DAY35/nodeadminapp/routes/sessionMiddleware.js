exports.isLoggedIn = (req, res, next) => {
  if (!req.session.loginUser) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (req.session.loginUser) {
    next();
  } else {
    res.redirect('/');
  }
};
