const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { isLoggedIn } = require('./passportMiddleware');
const AES = require('mysql-aes');

const db = require('../models/index');
const sequelize = db.sequelize;
const { QueryTypes } = sequelize;

router.get('/list', isLoggedIn, async (req, res, next) => {
  const searchOption = {
    companyCode: '0',
    adminid: '',
    usedYNCode: '9',
  };

  const sqlQuery = `SELECT 
    admin_member_id,company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id
    FROM admin_member;`;

  const admins = await sequelize.query(sqlQuery, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  res.render('admin/list.ejs', { admins, searchOption });
});

router.get('/create', isLoggedIn, async (req, res, next) => {
  res.render('admin/create.ejs');
});

router.post('/create', isLoggedIn, async (req, res, next) => {
  const {
    companyCode,
    adminid,
    admin_password,
    admin_name,
    email,
    telephone,
    usedYNCode,
    dept_name,
  } = req.body;
  const encryptedPassword = await bcrypt.hash(admin_password, 12);

  const encryptedEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
  const encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

  const admin = {
    company_code: companyCode,
    admin_id: adminid,
    admin_password: encryptedPassword,
    admin_name,
    email: encryptedEmail,
    telephone: encryptedTelephone,
    dept_name,
    used_yn_code: usedYNCode,
    reg_date: Date.now(),
    reg_member_id: 1,
    edit_date: Date.now(),
    edit_member_id: 1,
  };

  await db.Admin.create(admin);
  res.redirect('/admin/list');
});

router.get('/modify/:aid', isLoggedIn, async (req, res, next) => {
  const aid = req.params.aid;

  const admin = await db.Admin.findOne({ where: { admin_member_id: aid } });

  admin.email = AES.decrypt(admin.email, process.env.MYSQL_AES_KEY);
  admin.telephone = AES.decrypt(admin.telephone, process.env.MYSQL_AES_KEY);

  res.render('admin/modify.ejs', { admin });
});

module.exports = router;
