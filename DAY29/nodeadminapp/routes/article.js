var express = require('express');
var router = express.Router();
const multer = require('multer');
const { upload } = require('../common/aws_s3');
const moment = require('moment');

// 파일 저장위치 지정
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${moment(Date.now()).format('YYYYMMDDHHMMss')}_${file.originalname}`
    );
  },
});

//일반 업로드처리 객체 생성
var uploadSimple = multer({ storage: storage });

var db = require('../models/index');
var Op = db.Sequelize.Op;

var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

router.get('/list', async (req, res) => {
  var searchOption = {
    boardTypeCode: '0',
    title: '',
    isDisplayCode: '9',
  };

  var articles = await db.Article.findAll({
    attributes: [
      'article_id',
      'board_type_code',
      'title',
      'article_type_code',
      'view_count',
      'is_display_code',
      'reg_date',
      'reg_member_id',
    ],
    order: [['article_id', 'DESC']], //DESC 오름차순 3,2,1, ASC 내림차순: 1,2,3
  });

  var articleCount = await db.Article.count();

  res.render('article/list.ejs', { articles, searchOption, articleCount });
});

router.post('/list', async (req, res) => {
  var boardTypeCode = req.body.boardTypeCode;
  var title = req.body.title;
  var isDisplayCode = req.body.isDisplayCode;

  var searchOption = {
    boardTypeCode,
    title,
    isDisplayCode,
  };

  //step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서 게시글 목록을 재조회해온다.
  //SELECT * FROM article WHERE board_type_code = 1 SQL구문으로 변환되어 DB서버에 전달실행
  var articles = await db.Article.findAll({
    where: { board_type_code: searchOption.boardTypeCode },
  });

  //Select Count(*) FROM article SQL쿼리로 생성됨..
  var articleCount = await db.Article.count();

  //step3) 게시글 목록 페이지 list.ejs에 데이터 목록을 전달한다.
  res.render('article/list.ejs', { articles, searchOption, articleCount });
});

router.get('/create', async (req, res) => {
  res.render('article/create.ejs');
});

// router.post('/create', uploadSimple.single('file'), async (req, res) => {
//   var boardTypeCode = req.body.boardTypeCode;
//   var title = req.body.title;
//   var contents = req.body.contents;
//   var articleTypeCode = req.body.articleTypeCode;
//   var isDisplayCode = req.body.isDisplayCode;
//   var reg_member_id = req.body.reg_member_id;

//   const uploadFile = req.file;
//   var filePath = '/upload/' + uploadFile.filename;
//   var fileName = uploadFile.filename;
//   var fileOrignalName = uploadFile.originalname;
//   var fileSize = uploadFile.size;
//   var fileType = uploadFile.mimetype;

//   var article = {
//     board_type_code: boardTypeCode,
//     title,
//     contents,
//     view_count: 0,
//     ip_address: '111.222.222.222',
//     article_type_code: articleTypeCode,
//     is_display_code: isDisplayCode,
//     reg_member_id: 1,
//     reg_date: Date.now(),
//   };

//   //게시글 정보를 article테이블에 저장하고 저장된 값을 다시 반환받는다.
//   await db.Article.create(article);
//   //var registedArticle = await db.Article.create(article);

//   //step3:등록처리후 게시글 목록 웹페이지로 이동처리
//   res.redirect('/article/list');
// });

// getUpload('upload/').fields([{ name: 'file', maxCount: 1 }])
// S3 File upload
router.post(
  '/create',
  uploadSimple.single('file'),
  // name = HTML Name Value
  // maxCount = Upload File Count
  async (req, res) => {
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var reg_member_id = req.body.reg_member_id;

    var article = {
      board_type_code: boardTypeCode,
      title,
      contents: 'TEST',
      view_count: 0,
      ip_address: '111.222.222.222',
      article_type_code: articleTypeCode,
      is_display_code: isDisplayCode,
      reg_member_id: 1,
      reg_date: Date.now(),
    };

    //게시글 정보를 article테이블에 저장하고 저장된 값을 다시 반환받는다.
    const registedArticle = await db.Article.create(article);

    const uploadFile = req.files.file;
    if (uploadFile) {
      var filePath = '/upload/' + uploadFile.filename;
      var fileName = uploadFile.filename;
      var fileOrignalName = uploadFile.originalname;
      var fileSize = uploadFile.size;
      var fileType = uploadFile.mimetype;

      const file = {
        article_id: registedArticle.article_id,
        file_name: fileOrignalName,
        file_size: fileSize,
        file_path: filePath,
        file_type: fileType,
        reg_date: Date.now(),
        reg_member_id: 1,
      };

      await db.ArticleFile.create(file);
    }

    //step3:등록처리후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
  }
);

//기존 게시를 삭제처리 요청 및 응답 라우팅메소드
//http://localhost:3000/article/delete?aid=3
router.get('/delete', async (req, res) => {
  //step1: 삭제하려는 게시글 고유번호를 추출한다.
  var articleIdx = req.query.aid;

  //step2:게시번호기반으로 실제 DB article테이블에서 데이터를 삭제처리한다.
  var deletedCnt = await db.Article.destroy({
    where: { article_id: articleIdx },
  });

  //step3: 게시글 목록 페이지로 이동시킨다.
  res.redirect('/article/list');
});

//기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅 메소드
//http://localhost:3000/article/modify/1
//GET
router.get('/modify/:aid', async (req, res) => {
  //step1:선택한 게시글 고유번호를 파라메터 방식으로 URL을 통해 전달받음
  var articleIdx = req.params.aid;

  //step2:해당 게시글 번호에 해당하는 특정 단일게시글 정보를 DB article테이블에서
  //조회해 온다.
  var article = await db.Article.findOne({ where: { article_id: articleIdx } });

  //단일 게시글에 동적 속성기반 댓글목록 속성추가
  article.comments = [
    { coment_id: 1, comment: '댓글1입니다.' },
    { coment_id: 2, comment: '댓글2입니다.' },
  ];

  //step3: 단일 게시글 정보르 뷰에 전달한다.
  res.render('article/modify.ejs', { article });
});

//기존 게시글 사용자 수정정보 처리 요청과 응답 라우팅 메소드
//http://localhost:3000/article/modify/1
//POST
router.post('/modify/:aid', async (req, res) => {
  //게시글 고유번호 URL파라메터에서 추출하기
  var articleIdx = req.params.aid;

  //step1: 사용자가 입력한 게시글 등록 데이터 추출
  var boardTypeCode = req.body.boardTypeCode;
  var title = req.body.title;
  var contents = req.body.contents;
  var articleTypeCode = req.body.articleTypeCode;
  var isDisplayCode = req.body.isDisplayCode;
  var register = req.body.register;

  //step2:추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서
  //DB article테이블에 수정처리한다.
  //수정 처리하면 처리건수값이 반환됩니다.

  //수정할 게시글 데이터
  var article = {
    board_type_code: boardTypeCode,
    title,
    contents,
    article_type_code: articleTypeCode,
    is_display_code: isDisplayCode,
    ip_address: '111.222.222.222',
    edit_member_id: 1,
    edit_date: Date.now(),
  };

  //DB article테이블의 컬럼내용들 수정처리하고 수정건수 반환받기
  //await db.Article.update(수정할데이터,조건)는
  //UPDATE article SET board_type_code=1,title='',contents=''.... WHERE article_id=1; SQL이 생성되어
  //DB서버로 전달되어 수정되고 수정된 건수가 배열로 전달된다.
  var updatedCount = await db.Article.update(article, {
    where: { article_id: articleIdx },
  });

  //step3:수정처리후 게시글 목록 웹페이지로 이동처리
  res.redirect('/article/list');
});

module.exports = router;
