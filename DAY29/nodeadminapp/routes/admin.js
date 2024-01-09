var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const AES = require('mysql-aes');

var db = require('../models/index');
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

router.get('/list', async (req, res, next) => {
  const searchOption = {
    company_code: 0,
    admin_id: '0',
    userd_yn_code: 9,
  };

  const sqlQuery = `SELECT 
    admin_member_id, company_code,admin_id,admin_member_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id 
    FROM admin_member;`;

  const admins = await sequelize.query(sqlQuery, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  res.render('admin/list', { admins, searchOption });
});

router.post('/list', async (req, res, next) => {
  const searchOption = {
    company_code: 0,
    admin_id: '',
    used_yn_code: 9,
  };

  const admins = await db.Admin.findAll();
  res.render('admin/list', { admins, searchOption });
});

router.get('/create', async (req, res, next) => {
  res.render('admin/create');
});

router.post('/create', async (req, res, next) => {
  const {
    company_code,
    admin_id,
    admin_member_password,
    admin_name,
    email,
    telephone,
    dept_name,
    used_yn_code,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(admin_member_password, 12);
  // 암호화 할 값, 몇번을 반복으로 암호화 할 건지

  const encryptTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);
  const encryptEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);

  const newAdmin = {
    company_code,
    admin_id,
    admin_member_password: encryptedPassword,
    admin_name,
    email: encryptEmail,
    telephone: encryptTelephone,
    dept_name,
    used_yn_code,
    reg_date: Date.now(),
    reg_member_id: 1,
  };

  try {
    await db.Admin.create(newAdmin);
  } catch (error) {
    console.log(error);
  }

  res.redirect('/admin/list');
});

router.get('/modify/:id', async (req, res, next) => {
  const adminId = req.params.id;

  try {
    const selectAdmin = await db.Admin.findOne({
      where: { admin_member_id: adminId },
    });
    selectAdmin.email = AES.decrypt(
      selectAdmin.email,
      process.env.MYSQL_AES_KEY
    );
    selectAdmin.telephone = AES.decrypt(
      selectAdmin.telephone,
      process.env.MYSQL_AES_KEY
    );

    res.render('admin/modify', { selectAdmin });
  } catch (error) {
    console.log(error);
  }
});

router.post('/modify:id', async (req, res, next) => {
  const {
    company_code,
    admin_id,
    admin_member_password,
    admin_name,
    email,
    telephone,
    dept_name,
    used_yn_code,
  } = req.body;
});

module.exports = router;
