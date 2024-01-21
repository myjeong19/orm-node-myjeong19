var express = require('express');
var router = express.Router();

var moment = require('moment');

const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');

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

var db = require('../models/index');

var Op = db.Sequelize.Op;
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

router.get('/list', isLoggedIn, async (req, res, next) => {
  var searchOption = {
    board_type_code: '0',
    title: '',
    is_display_code: '9',
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
    order: [['article_id', 'DESC']], //DESC 오름차순: 3,2,1 / ASC 내림차순: 1,2,3
  });
  var articleCount = await db.Article.count();
  res.render('article/list', { articles, searchOption, articleCount });
});

router.post('/list', isLoggedIn, async (req, res, next) => {
  var board_type_code = req.body.board_type_code;
  var title = req.body.title;
  var is_display_code = req.body.is_display_code;

  var searchOption = {
    board_type_code,
    title,
    is_display_code,
  };

  var articles = await db.Article.findAll({
    where: { board_type_code: searchOption.board_type_code },
  });

  var articleCount = await db.Article.count();
  res.render('article/list', { articles, searchOption, articleCount });
});

router.get('/create', isLoggedIn, async (req, res, next) => {
  res.render('article/create');
});

router.post(
  '/create',
  isLoggedIn,
  simpleUpload.single('file1'),
  async (req, res, next) => {
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
      view_count: 0,
      ip_address: '111.111.222.222',
      article_type_code,
      is_display_code,
      reg_member_id: req.session.passport.user.admin_member_id,
      reg_date: Date.now(),
    };

    var registedArticle = await db.Article.create(article);

    const uploadFile = req.file;

    //
    if (uploadFile != undefined) {
      var filePath = '/upload/' + uploadFile.filename;
      var fileName = uploadFile.filename;
      var fileOrignalName = uploadFile.originalname;
      var fileSize = uploadFile.size;
      var fileType = uploadFile.mimetype;

      var file = {
        article_id: registedArticle.article_id,
        file_name: fileOrignalName,
        file_size: fileSize,
        file_path: filePath,
        file_type: fileType,
        reg_date: Date.now(),
        reg_member_id: req.session.passport.user.admin_member_id,
      };

      await db.ArticleFile.create(file);
    }

    res.redirect('/article/list');
  }
);

router.get('/delete', isLoggedIn, async (req, res, next) => {
  var articleIdx = req.query.aid;

  var deleteCnt = await db.Article.destroy({
    where: { article_id: articleIdx },
  });

  res.redirect('/article/list');
});

router.get('/modify/:aid', isLoggedIn, async (req, res, next) => {
  var articleIdx = req.params.aid;

  var article = await db.Article.findOne({ where: { article_id: articleIdx } });

  article.comments = [
    { coment_id: 1, comment: '댓글1입니다.' },
    { coment_id: 2, comment: '댓글2입니다.' },
  ];
  res.render('article/modify', { article });
});

router.post('/modify/:aid', isLoggedIn, async (req, res, next) => {
  var articleIdx = req.params.aid;
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
    ip_address: '111.111.222.222',
    edit_member_id: req.session.passport.user.admin_member_id,
    edit_date: Date.now(),
  };

  var updatedCount = await db.Article.update(article, {
    where: { article_id: articleIdx },
  });

  res.redirect('/article/list');
});

module.exports = router;
