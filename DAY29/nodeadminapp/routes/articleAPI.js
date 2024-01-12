var express = require('express');
var router = express.Router();

const multer = require('multer');
const { upload } = require('../common/aws_s3');
const moment = require('moment');

//파일저장위치 지정
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

//전체 게시글 목록 데이터 조회 반환 API 라우팅 메소드
//http://localhost:3000/api/article/all
router.get('/all', async (req, res) => {
  //API라우팅 메소드 반환형식 정의
  var apiResult = {
    code: 200,
    data: [],
    result: 'Ok',
  };

  //예외처리 구문....
  try {
    //try블록안에 에러가 발생할수 있는 각종 개발자 코드 구현...

    //step1: DB에서 전체 게시글 목록 데이터를 조회한다.
    const articles = [
      {
        article_id: 1,
        board_type_code: 1,
        title: '공지게시글 1번글입니다.',
        contents: '공지게시글 1번 내용입니다.',
        view_count: 10,
        ip_address: '111.111.124.44',
        is_display_code: 1,
        reg_date: '2023-12-12',
        reg_member_id: 'eddy',
      },
      {
        article_id: 2,
        board_type_code: 2,
        title: '기술 블로깅 게시글 1번글입니다.',
        contents: '기술 게시글 1번 내용입니다.',
        view_count: 20,
        ip_address: '222.111.124.44',
        is_display_code: 0,
        reg_date: '2023-12-13',
        reg_member_id: 'eddy',
      },
      {
        article_id: 3,
        board_type_code: 2,
        title: '기술 게시글 입니다.',
        contents: '기술 게시글 내용입니다.',
        view_count: 30,
        ip_address: '123.111.124.44',
        is_display_code: 1,
        reg_date: '2023-12-14',
        reg_member_id: 'eddy',
      },
    ];

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});

router.post('/create', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'Ok',
  };

  try {
    //step1: 프론트엔드에서 전달해준 신규 게시글 JSON데이터 추출하기
    //step1: 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    var article = {
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate: Date.now(),
    };

    //step2:DB article 테이블에 데이터를 등록하고 등록된 데이터가 반환된다.
    var savedArticle = {
      article_id: 1,
      board_type_code: 1,
      title: '공지게시글 1번글입니다.',
      contents: '공지게시글 1번 내용입니다.',
      view_count: 10,
      ip_address: '111.111.124.44',
      is_display_code: 1,
      reg_date: '2023-12-12',
      reg_member_id: 'eddy',
    };

    //step3: 정상 데이터 등록처리 결과값 세팅하기
    apiResult.code = 200;
    apiResult.data = savedArticle;
    apiResult.result = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});

//단일 게시글 수정처리 API  라우팅 메소드
//http://localhost:3000/api/article/update
router.post('/update', async (req, res) => {
  //API라우팅 메소드 반환형식 정의
  var apiResult = {
    code: 200,
    data: [],
    result: 'Ok',
  };

  try {
    var articleIdx = req.body.articleIdx;

    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    var article = {
      articleIdx,
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate: Date.now(),
    };

    var affectedCnt = 1;

    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});

router.post('/upload', uploadSimple.single('file'), async (req, res, next) => {
  const apiResult = {
    code: 200,
    data: null,
    result: '',
  };

  try {
    const uploadFile = req.file;
    var filePath = '/upload/' + uploadFile.filename;
    var fileName = uploadFile.filename;
    var fileOrignalName = uploadFile.originalname;
    var fileSize = uploadFile.size;
    var fileType = uploadFile.mimetype;

    apiResult.code = 200;
    apiResult.data = {
      filePath,
      fileName,
      fileOrignalName,
      fileSize,
      fileType,
    };
    apiResult.result = 'OK';
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = {};
    apiResult.result = 'Failed';
    console.log(error);
  }

  res.json(apiResult);
});

router.post(
  '/uploadS3',
  upload.getUpload('upload/').fields([{ name: 'file', maxCount: 1 }]),
  async (req, res, next) => {
    const apiResult = {
      code: 200,
      data: null,
      result: '',
    };

    try {
      const uploadFile = req.files.file[0];
      var filePath = '/upload/' + uploadFile.filename;
      var fileName = uploadFile.filename;
      var fileOrignalName = uploadFile.originalname;
      var fileSize = uploadFile.size;
      var fileType = uploadFile.mimetype;

      apiResult.code = 200;
      apiResult.data = {
        filePath,
        fileName,
        fileOrignalName,
        fileSize,
        fileType,
      };
      apiResult.result = 'OK';
    } catch (error) {
      apiResult.code = 500;
      apiResult.data = {};
      apiResult.result = 'Failed';
      console.log(error);
    }

    res.json(apiResult);
  }
);

router.get('/:aidx', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'Ok',
  };

  try {
    var articleIdx = req.params.aidx;
    var article = {
      article_id: 1,
      board_type_code: 1,
      title: '공지게시글 1번글입니다.',
      contents: '공지게시글 1번 내용입니다.',
      view_count: 10,
      ip_address: '111.111.124.44',
      is_display_code: 1,
      article_type_code: 1,
      reg_date: '2023-12-12',
      reg_member_id: 'eddy',
    };

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});

router.delete('/:aidx', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'Ok',
  };

  try {
    var articleIdx = req.params.aidx;

    var deletedCnt = 1;

    apiResult.code = 200;
    apiResult.data = deletedCnt;
    apiResult.result = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});

module.exports = router;
