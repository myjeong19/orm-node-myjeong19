const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  res.redirect('/chat');
});

router.get('/entry', async (req, res, next) => {
  res.render('entry');
});

router.post('/entry', async (req, res) => {
  res.redirect('/');
});

router.get('/find', async (req, res, next) => {
  res.render('find');
});

router.post('/find', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = {
    email,
    password,
  };

  console.log(newUser);

  res.redirect('login');
});

module.exports = router;
