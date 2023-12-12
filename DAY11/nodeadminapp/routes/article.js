const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('article/article', { title: 'main' });
});

router.get('/list', async (req, res) => {
  res.render('article/list', { title: 'list' });
});
router.get('/create', async (req, res) => {
  res.render('article/create', { title: 'create' });
});
router.post('/create', async (req, res) => {});

router.get('/modify', async (req, res) => {
  res.render('article/modify', { title: 'modify' });
});

router.post('/modify', async (req, res) => {});

router.get('/delete', async (req, res) => {
  res.render('index', { title: 'delete' });
});

module.exports = router;
