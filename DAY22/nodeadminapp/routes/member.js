const express = require('express');
const router = express.Router();

const userList = [
  {
    email: 'myjeong19@naver.com',
    name: '정민영',
    profile_img_path:
      'https://images.unsplash.com/photo-1682685797857-97de838c192e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D',
    telephone: '010-3957-3540',
    entry_type_code: '1',
    user_state_code: '1',
    birth_date: '1998-03-19',
    reg_date: '2023-12-19',
    reg_member_id: '0',
    edit_date: new Date(),
    edit_member_id: '1',
  },

  {
    email: 'gildong_hong@gmail.com',
    name: '홍길동',
    profile_img_path:
      'https://plus.unsplash.com/premium_photo-1700346683442-6c95ec53f6a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D',
    telephone: '010-1111-1111',
    entry_type_code: '2',
    user_state_code: '1',
    birth_date: '1990-03-10',
    reg_date: '2023-12-19',
    reg_member_id: '1',
    edit_date: new Date(),
    edit_member_id: '1',
  },
];

router.get('/', async (req, res) => {
  res.render('member/member');
});

router.get('/list', async (req, res) => {
  res.render('member/list', { userList });
});

router.get('/create', async (req, res) => {
  res.render('member/create');
});

router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify/:id', async (req, res) => {
  const userId = req.params.id;
  const user = userList[userId];
  res.render('member/modify', { user });
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('/member/list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
