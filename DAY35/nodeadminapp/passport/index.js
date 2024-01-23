const local = require('./localStrategy');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    // user sisson 정보
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  local(passport);
  //   local 전략
};
