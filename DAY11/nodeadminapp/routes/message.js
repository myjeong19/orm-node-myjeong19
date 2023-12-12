const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('message/message');
});

router.get('/list', async (req, res) => {
  res.render('message/list');
});
router.get('/create', async (req, res) => {
  res.render('message/create');
});
router.post('/create', async (req, res) => {});

router.get('/modify', async (req, res) => {
  res.render('message/modify');
});

router.post('/modify', async (req, res) => {});

router.get('/delete', async (req, res) => {
  res.render('index', { title: 'delete' });
});

module.exports = router;
