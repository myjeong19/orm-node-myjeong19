const express = require('express');
const router = express.Router();

const articleList = [
  {
    article_id: '0',
    board_type_code: '1',
    title: '갈비찜을 밥 위에 얹어주세요.',
    article_type_code: '1',
    contents: '내가 좋아하는 갈비찜 덮밥 아 아 ~ 아 아~ 냠냠',
    view_count: '112',
    ip_address: '1111.1111.1111.12',
    reg_date: '2023-12-19',
    reg_member_id: 'myjeong19',
    edit_date: new Date(),
    edit_member_id: 'myjeong19',
  },

  {
    article_id: '1',
    board_type_code: '1',
    title: '12월 20일 17시 긴급 점검 안내드립니다.',
    article_type_code: '1',
    contents: '12월 20일 17시 긴급 점검 예정입니다 감사합니다.',
    view_count: '110',
    ip_address: '2222.1111.1111.12',
    reg_date: '2023-12-20',
    reg_member_id: 'myjeong19',
    edit_date: new Date(),
    edit_member_id: 'myjeong19',
  },
];

router.get('/list', async (req, res) => {
  res.render('article/list', { articleList });
});
router.get('/create', async (req, res) => {
  res.render('article/create');
});
router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify/:id', async (req, res) => {
  const articleIndex = req.params.id;
  const article = articleList[articleIndex];

  res.render('article/modify', { article });
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
