var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const cors = require('cors');
var sequelize = require('./models/index.js').sequelize;
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var channelRouter = require('./routes/channel');

var memberAPIRouter = require('./routes/memberAPI.js');
var channelAPIRouter = require('./routes/channelAPI.js');

var app = express();
sequelize.sync();
// app.use(cors());

//특정 도메인주소만 허가
app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    origin: [
      'http://localhost:3005',
      'https://beginmate.com',
      'https://naver.com',
    ],
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//레이아웃 설정
app.set('layout', 'layout/authLayout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout extractMetas', true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', channelRouter);

app.use('/api/member', memberAPIRouter);
app.use('/api/channel', channelAPIRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
