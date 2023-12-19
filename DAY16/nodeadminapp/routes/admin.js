const express = require('express');
const router = express.Router();

const adminList = [
  {
    admin_member_id: '0',
    company_code: '1',
    admin_id: 'myjeong19',
    admin_password: '1234',
    admin_name: '정민영',
    email: 'myjeong19@naver.com',
    telephone: '010-3957-3540',
    used_yn_code: '1',
    edit_user: 'admin',
    edit_date: new Date(),
    reg_user_id: 'admin',
    reg_date: '2023-12-18',
  },

  {
    admin_member_id: '1',
    company_code: '2',
    admin_id: 'hyun-do_kim',
    admin_password: '1234',
    admin_name: '김현도',
    email: 'hyun-do_kim@naver.com',
    telephone: '010-1111-1111',
    used_yn_code: '1', // 사용 여부
    edit_user: 'hyun-do_kim',
    edit_date: new Date(),
    reg_user_id: 'hyun-do_kim',
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
