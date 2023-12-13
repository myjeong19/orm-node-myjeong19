const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/all', async (req, res, next) => {
  res.render('index');
});

router.post('/create', async (req, res, next) => {
  res.render('index');
});
router.post('/modify', async (req, res, next) => {
  res.render('index');
});
router.post('/delete', async (req, res, next) => {
  res.render('index');
});

router.get('/:cid', async (req, res, next) => {
  res.render('index');
});

module.exports = router;
