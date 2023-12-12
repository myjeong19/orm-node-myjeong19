const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('admin/admin');
});

router.get('/list', async (req, res) => {
  res.render('admin/list');
});
router.get('/create', async (req, res) => {
  res.render('admin/create');
});
router.post('/create', async (req, res) => {});

router.get('/modify', async (req, res) => {
  res.render('admin/modify');
});

router.post('/modify', async (req, res) => {});

router.get('/delete', async (req, res) => {
  res.render('index', { title: 'delete' });
});

module.exports = router;
