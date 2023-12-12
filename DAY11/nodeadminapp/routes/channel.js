const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('channel/channel');
});

router.get('/list', async (req, res) => {
  res.render('channel/list');
});
router.get('/create', async (req, res) => {
  res.render('channel/create');
});
router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify', async (req, res) => {
  res.render('channel/modify');
});

router.post('/modify', async (req, res) => {
  res.redirect('list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
