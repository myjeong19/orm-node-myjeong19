const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
  const boardTypeCode = '0';
  const title = '';
  const isDisplayCode = '9';

  const searchOption = { boardTypeCode, title, isDisplayCode };

  // STEP1: 모든 게시글 정보 조회
  const articles = [
    {
      article_id: 1,
      board_type_code: 1,
      title: '2023년 12월 14일 18시 임시점검',
      contents: '임시 점검 실시 예정입니다.',
      view_count: 121,
      ip_address: '111.111.111.11',
      is_display_code: 1,
      reg_date: '2023-12-13',
      reg_member_id: 'myjeong19',
    },
    {
      article_id: 2,
      board_type_code: 2,
      title: '안녕하세요 정민영입니다.',
      contents: '환영합니다.',
      view_count: 1,
      ip_address: '111.111.111.11',
      is_display_code: 0,
      reg_date: '2023-12-14',
      reg_member_id: 'myjeong19',
    },
    {
      article_id: 3,
      board_type_code: 2,
      title: '갈비찜을 밥 위에 얹어주세요.',
      contents: '내가 좋아하는 갈비찜 덮밥',
      view_count: 116,
      ip_address: '121.121.121.11',
      is_display_code: 1,
      reg_date: '2023-12-13',
      reg_member_id: 'gil-dong.hong',
    },
  ];

  // STEP2: 게시글 전체 정보를 list.ejs에 전달
  res.render('article/list', { articles, searchOption });
});

router.post('/list', async (req, res) => {
  // STEP 1: 사용자가 선택 혹은 입력한 조회 옵션 데이터 추출
  const boardTypeCode = req.body.boardTypeCode;
  const title = req.body.title;
  const isDisplayCode = req.body.isDisplayCode;

  const searchOption = { boardTypeCode, title, isDisplayCode };

  const articles = [
    {
      article_id: 1,
      board_type_code: 1,
      title: '2023년 12월 14일 18시 임시점검',
      contents: '임시 점검 실시 예정입니다.',
      view_count: 121,
      ip_address: '111.111.111.11',
      is_display_code: 1,
      reg_date: '2023-12-13',
      reg_member_id: 'myjeong19',
    },
  ];

  res.render('article/list', { articles, searchOption });
});

router.get('/create', async (req, res) => {
  res.render('article/create');
});

router.post('/create', async (req, res) => {
  // STEP1: 사용자가 입력한 게시글 등록 데이터 추출
  const {
    boardTypeCode,
    title,
    contents,
    articleTypeCode,
    isDisplayCode,
    register,
  } = req.body;

  // STEP2: 추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서, DB article테이블에 영구 저장 처리

  const article = {
    boardTypeCode,
    title,
    contents,
    articleTypeCode,
    isDisplayCode,
    register,
    registDate: new Date(),
  };

  // STEP3: 등록 처리후 게시글 목록 웹 페이지로 이동처리

  res.redirect('/article/list');
});

router.get('/delete', async (req, res) => {
  const articleIndex = req.query.aid;

  res.redirect('/article/list');
});

router.get('/modify/:aid', async (req, res) => {
  const articleIndex = req.params.aid;

  res.render('article/modify');
});

router.post('/modify/:aid', async (req, res) => {
  const articleIndex = req.params.aid;

  res.redirect('list');
});

module.exports = router;
