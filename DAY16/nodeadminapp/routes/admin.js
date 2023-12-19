const express = require('express');
const router = express.Router();

const adminList = [
  {
    admin_member_id: '1',
    company_code: '1',
    admin_id: 'myjeong19@naver.com',
    admin_password: '1234',
    admin_name: '정민영',
    email: 'myjeong19@naver.com',
    telephone: '010-3957-3540',
    used_yn_code: '1',
    reg_user_id: Date.now(),
    edit_user: 'ADMIN',
    edit_date: Date.now(),
    reg_date: '2023-12-18',
  },
];

router.get('/', async (req, res) => {
  res.render('admin/admin', { adminList });
});

router.get('/list', async (req, res) => {
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

router.get('/modify/:id', async (req, res) => {
  const admin_id = req.params.id;
  const admin = adminList[admin_id];

  res.render('admin/modify', { admin });
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
