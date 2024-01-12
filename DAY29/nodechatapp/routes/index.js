const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models/index');

/* GET home page. */

router.get('/', async (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const findUser = await db.Member.findOne({ where: { email: email } });
  const resultPassword = await bcrypt.compare(
    password,
    findUser.member_password
  );

  try {
    if (!findUser) {
    } else {
      if (resultPassword) {
        res.redirect('/chat');
      } else {
        res.render('login');
      }
    }
  } catch (error) {}
});

router.get('/entry', async (req, res, next) => {
  res.render('entry');
});

router.post('/entry', async (req, res) => {
  const { email, password, name, telephone, birth_date } = req.body;

  const ecryptedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    email,
    member_password: ecryptedPassword,
    name,
    telephone,
    birth_date,
    profile_img_path: '',
    entry_type_code: 0,
    use_state_code: 1,
    reg_date: Date.now(),
    reg_member_id: 0,
  };

  try {
    await db.Member.create(newUser);
  } catch (error) {}

  res.redirect('/');
});

router.get('/find', async (req, res, next) => {
  res.render('find');
});

router.post('/find', async (req, res) => {
  res.redirect('login');
});

module.exports = router;
