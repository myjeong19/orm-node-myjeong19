const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('admin/admin');
});

router.get('/list', async (req, res) => {
  const adminList = [
    {
      adminIdx: 1,
      company: 'Vercel',
      department: '개발팀',
      id: 'myjeong19@naver.com',
      email: 'myjeong19@naver.com',
      tell: '010-3957-3540',
      display: 'Y',
      createDate: Date.now(),
      modifyDate: Date.now(),
    },
  ];

  res.render('admin/list', { adminList });
});
router.get('/create', async (req, res) => {
  res.render('admin/create');
});
router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/delete', async (req, res) => {
  res.render('admin/delete');
});

router.get('/modify/:aid', async (req, res) => {
  const admin = {
    adminIdx: 1,
    company: 'Vercel',
    department: '개발팀',
    id: 'myjeong19@naver.com',
    email: 'myjeong19@naver.com',
    tell: '010-3957-3540',
    display: 'Y',
    createDate: Date.now(),
    modifyDate: Date.now(),
  };

  res.render('admin/modify', { admin });
});

router.post('/modify/:aid', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
