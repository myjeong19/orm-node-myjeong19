const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', async (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  res.redirect('/chat');
});

router.get('/entry', async (req, res, next) => {
  res.render('entry');
});

router.post('/entry', async (req, res) => {
  res.redirect('login');
});

router.get('/find', async (req, res, next) => {
  res.render('find');
});

router.post('/find', async (req, res) => {
  res.redirect('login');
});

module.exports = router;
