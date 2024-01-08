const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = sequelize;

//게시글 목록 조회
//http://localhost:/article/list
//GET
router.get('/list', async (req, res) => {
  const searchOption = {
    boardTypeCode: '0',
    title: '',
    isDisplayCode: '9',
  };

  //STEP1 :DB에서 모든 게시글 데이터 목록을 조회
  // ㄴSELECT article_id FOROM article WHRE is
  // var articles = await db.Article.findAll({
  //   attributes: [
  //     'article_id',
  //     'board_type_code',
  //     'title',
  //     'article_type_code',
  //     'view_count',
  //     'is_display_code',
  //     'reg_member_id',
  //   ],
  //   where: {
  //     is_display_code: 1,
  //     // view_count: { [Op.not]: 0 }
  //   },
  //   order: [['article_id', 'DESC']],
  // });

  // const sqlQuery = `SELECT article_id,board_type_code,title,article_type_code,view_count,ip_address,is_display_code,reg_date,reg_member_id
  // FROM article
  // WHERE is_display_code = 1
  // ORDER BY article_id DESC;
  // `;

  var articles = await sequelize.query(
    'CALL SP_CHAT_ARTICLE_DISPLAY (:P_DISPLAY_CODE)',
    { replacements: { P_DISPLAY_CODE: searchOption.isDisplayCode } }
  );

  // const articles = await sequelize.query(sqlQuery, {
  //   raw: true,
  //   type: QueryTypes.SELECT,
  // });

  // SELECT COUNT(*) FROM Articles
  const articleCount = await db.Article.count();

  //STEP2 : 게시글 전체 목록을 list.ejs뷰에 전달
  res.render('article/list', { articles, searchOption, articleCount });
});

// 게시글 목록에서 조회옵션 데이터를 전달 받아
// 조회옵션기반 게시글 목록 조회후
// 게시글 목록 페이지 처리
//http://localhost:/article/list
//POST
router.post('/list', async (req, res) => {
  //STEP1 : 사용자가 선택/입력한 조회옵션 데이터를 추출한다.
  const { boardTypeCode, title, isDisplayCode } = req.body;

  const searchOption = {
    boardTypeCode,
    title,
    isDisplayCode,
  };

  //STEP2 : 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서 게시글 목록을 재조회
  // SELECT * FROM article WHERE board_type_code = 1
  var articles = await db.Article.findAll({
    where: { board_type_code: searchOption.boardTypeCode },
  });

  const articleCount = await db.Article.count();

  //STEP3 ) 게시글 목록 페이지 list.ejs에 데이터 목록을 전달
  res.render('article/list', { articles, searchOption, articleCount });
});

//신규 게시글 등록
//http://localhost:3000/article/create
router.get('/create', async (req, res) => {
  res.render('article/create.ejs');
});

//신규 게시글 사용자 등록정보 처리 요청 및 응답 라우팅메소드
// article 모델 컬럼에 반드시 들어와야하는 값 (board_type_code, title, article_type_code, view_count)
router.post('/create', async (req, res) => {
  //STEP1 : 사용자가 입력한 게시글 등록 데이터 추출
  const { boardTypeCode, title, contents, articleTypeCode, isDisplayCode } =
    req.body;

  //STEP2 :추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해
  //DB article테이블에 영구적으로 저장처리
  //저장처리후 article테이블에 저장된 데이터 반환

  //등록할 게시글 데이터
  const article = {
    board_type_code: boardTypeCode,
    title,
    contents,
    view_count: 0,
    ip_address: '111.111.111.111',
    article_type_code: articleTypeCode,
    is_display_code: isDisplayCode,
    reg_member_id: 1,
    reg_date: Date.now(),
  };

  // 게시글 정보 article 테이블에 저장 후 저장 값 반환
  await db.Article.create(article);

  //STEP3 :등록처리후 게시글 목록 웹페이지로 이동처리
  res.redirect('/article/list');
});

//기존 게시를 삭제처리
//http://localhost:3000/article/delete?aid=3
router.get('/delete', async (req, res) => {
  //STEP1 : 삭제하려는 게시글 고유번호를 추출
  const articleIdx = req.query.aid;

  //STEP2 :게시번호기반으로 실제 DB article테이블에서 데이터를 삭제처리
  await db.Article.destroy({ where: { article_id: articleIdx } });

  //STEP3 : 게시글 목록 페이지로 이동
  res.redirect('/article/list');
});

//기존 게시글 정보 확인 및 수정
//http://localhost:3000/article/modify/1
//GET
router.get('/modify/:aid', async (req, res) => {
  //STEP1 :선택한 게시글 고유번호를 파라메터 방식으로 URL을 통해 전달받음
  const articleIdx = req.params.aid;

  //STEP2 :해당 게시글 번호에 해당하는 특정 단일게시글 정보를 DB article테이블에서 조회
  const article = await db.Article.findOne({
    where: { article_id: articleIdx },
  });

  article.comments = [
    { coment_id: 1, comment: '123' },
    { coment_id: 1, comment: '123' },
  ];

  //STEP3 : 단일 게시글 정보르 뷰에 전달
  res.render('article/modify.ejs', { article });
});

//기존 게시글 사용자 수정 정보처리
//http://localhost:3000/article/modify/1
//POST
router.post('/modify/:aid', async (req, res) => {
  //게시글 고유번호 URL파라메터에서 추출
  const articleIdx = req.params.aid;

  //STEP1 : 사용자가 입력한 게시글 등록 데이터 추출
  const boardTypeCode = req.body.boardTypeCode;
  const title = req.body.title;
  const contents = req.body.contents;
  const articleTypeCode = req.body.articleTypeCode;
  const isDisplayCode = req.body.isDisplayCode;
  const register = req.body.register;

  //STEP2 :추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해,
  //DB article테이블에 수정처리
  //수정 처리하면 처리건수값이 반환

  //수정할 게시글 데이터
  const article = {
    board_type_code: boardTypeCode,
    title,
    contents,
    article_type_code: articleTypeCode,
    is_display_code: isDisplayCode,
    ip_address: '111.222.333.444',
    edit_member_id: 1,
    edit_date: Date.now(),
  };

  await db.Article.update(article, {
    where: { article_id: articleIdx },
  });

  //STEP3 :수정처리후 게시글 목록 웹페이지로 이동처리
  res.redirect('/article/list');
});

module.exports = router;
