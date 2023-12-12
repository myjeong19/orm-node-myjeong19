const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('message/message', { title: 'main' });
});

router.get('/list', async (req, res) => {
  res.render('message/list', { title: 'list' });
});
router.get('/create', async (req, res) => {
  res.render('message/create', { title: 'create' });
});
router.post('/create', async (req, res) => {});

router.get('/modify', async (req, res) => {
  res.render('message/modify', { title: 'modify' });
});

router.post('/modify', async (req, res) => {});

router.get('/delete', async (req, res) => {
  res.render('index', { title: 'delete' });
});

module.exports = router;
