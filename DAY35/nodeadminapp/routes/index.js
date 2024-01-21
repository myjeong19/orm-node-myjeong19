const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');

const db = require('../models/index');

router.get('/', isLoggedIn, async (req, res, next) => {
  const admin_id = req.session.passport.user.admin_id;
  res.render('index');
});

router.get('/login', isNotLoggedIn, async (req, res, next) => {
  res.render('login', { layout: false, resultMsg: '' });
});

router.post('/login', async (req, res, next) => {
  const adminid = req.body.id;
  const adminPassword = req.body.password;
  const member = await db.Admin.findOne({ where: { admin_id: adminid } });
  let resultMsg = '';

  if (member == null) {
    resultMsg = '동일한 아이디가 존재하지 않습니다.';
    res.render('login', { resultMsg, layout: false });
  } else {
    const passwordResult = await bcrypt.compare(
      adminPassword,
      member.admin_password
    );

    if (passwordResult) {
      const sessionLoginData = {
        admin_member_id: member.admin_member_id,
        company_code: member.company_code,
        admin_id: member.admin_id,
        admin_name: member.admin_name,
      };

      req.session.loginUser = sessionLoginData;

      req.session.isLogined = true;

      req.session.save(function () {
        res.redirect('/');
      });
    } else {
      resultMsg = '암호가 일치하지 않습니다.';
      res.render('login', { resultMsg, layout: false });
    }
  }
});

router.post('/passportLogin', async (req, res, next) => {
  passport.authenticate('local', (authError, admin, info) => {
    if (authError) {
      console.log(authError);
      return next(authError);
    }

    if (!admin) {
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }

    return req.login(admin, loginError => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, async (req, res) => {
  req.logout(function (err) {
    req.session.destroy();
    res.redirect('/login');
  });
});

module.exports = router;
