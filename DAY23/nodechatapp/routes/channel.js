const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('chat/index', { layout: 'layout/chatLayout' });
});

module.exports = router;
