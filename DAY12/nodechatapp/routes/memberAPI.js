const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/all', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/create', async (req, res, next) => {});
router.post('/modify', async (req, res, next) => {});
router.post('/delete', async (req, res, next) => {});

router.get('/:mid', async (req, res, next) => {
  res.render('index');
});

module.exports = router;
