var bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
var db = require('../models/index');

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        //   입력한 아이디 패스워드 값
        usernameField: 'id',
        passwordField: 'password',
      },
      async (adminId, adminPWD, done) => {
        try {
          const admin = await db.Admin.findOne({
            where: { admin_id: adminId },
          });

          if (admin) {
            const result = await bcrypt.compare(adminPWD, admin.admin_password);

            if (result) {
              const sessionLoginData = {
                admin_member_id: admin.admin_member_id,
                company_code: admin.company_code,
                admin_id: admin.admin_id,
                admin_name: admin.admin_name,
              };

              done(null, sessionLoginData);
              //   서버의 메모리로 세션 정보 삽입
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '아이디가 일치하지 않습니다.' });
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
