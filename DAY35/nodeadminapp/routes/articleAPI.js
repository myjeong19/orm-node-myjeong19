var express = require('express');
var router = express.Router();

var moment = require('moment');

var multer = require('multer');

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

var simpleUpload = multer({ storage: storage });

router.get('/all', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'ok',
  };

  try {
    const articles = [
      {
        article_id: 1,
        board_type_code: 1,
        title: '공지게시글 1번 글입니다.',
        contents: '공지게시글 1번 내용입니다',
        viwe_count: 10,
        ip_address: '111.111.124.44',
        is_display_code: 1,
        reg_date: '2023-12-14',
        reg_member_id: 'myjeong19',
      },
      {
        article_id: 2,
        board_type_code: 2,
        title: '기술 블로깅 게시글 2번 글입니다.',
        contents: '기술 블로깅 게시글 2번 내용입니다',
        viwe_count: 20,
        ip_address: '221.111.124.44',
        is_display_code: 0,
        reg_date: '2023-12-12',
        reg_member_id: 'myjeong19',
      },
      {
        article_id: 3,
        board_type_code: 2,
        title: '기술 게시글 글입니다.',
        contents: '기술 게시글 내용입니다',
        viwe_count: 30,
        ip_address: '111.222.124.44',
        is_display_code: 1,
        reg_date: '2023-12-16',
        reg_member_id: 'myjeong19',
      },
    ];

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'failed';
  }

  res.json(apiResult);
});

router.post('/create', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'ok',
  };

  try {
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var contents = req.body.contents;
    var article_type_code = req.body.article_type_code;
    var is_display_code = req.body.is_display_code;
    var register = req.body.register;

    var article = {
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
      registDate: Date.now(),
    };

    const savedArticle = {
      article_id: 1,
      board_type_code: 1,
      title: '공지게시글 1번 글입니다.',
      contents: '공지게시글 1번 내용입니다',
      viwe_count: 10,
      ip_address: '111.111.124.44',
      is_display_code: 1,
      reg_date: '2023-12-14',
      reg_member_id: 'myjeong19',
    };

    apiResult.code = 200;
    apiResult.data = savedArticle;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'failed';
  }

  res.json(apiResult);
});

router.post('/update', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'ok',
  };

  try {
    var articleIdx = req.body.articleIdx;
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var contents = req.body.contents;
    var article_type_code = req.body.article_type_code;
    var is_display_code = req.body.is_display_code;
    var register = req.body.register;

    var article = {
      articleIdx,
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
      registDate: Date.now(),
    };

    var affectedCnt = 1;

    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = 'failed';
  }

  res.json(apiResult);
});

router.post('/upload', simpleUpload.single('file'), async (req, res) => {
  var apiResult = {
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
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = {};
    apiResult.result = 'failed';
  }

  res.json(apiResult);
});

router.get('/:aidx', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'ok',
  };

  try {
    var articleIdx = req.params.aidx;

    const article = {
      article_id: 1,
      board_type_code: 1,
      title: '공지게시글 1번 글입니다.',
      contents: '공지게시글 1번 내용입니다',
      viwe_count: 10,
      ip_address: '111.111.124.44',
      is_display_code: 1,
      article_type_code: 1,
      reg_date: '2023-12-14',
      reg_member_id: 'Jeong',
    };

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'failed';
  }

  res.json(apiResult);
});

router.delete('/:aidx', async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: 'ok',
  };

  try {
    var articleIdx = req.params.aidx;
    var deletedCnt = 1;
    apiResult.code = 200;
    apiResult.data = deletedCnt;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = 'failed';
  }
  res.json(apiResult);
});

module.exports = router;
