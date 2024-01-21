const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const flash = require('connect-flash');

require('dotenv').config();

const session = require('express-session');

const sequelize = require('./models/index').sequelize;

const passport = require('passport');

const passportConfig = require('./passport/index.js');

const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const articleRouter = require('./routes/article');
const articleAPIRouter = require('./routes/articleAPI');

const app = express();
app.use(flash());
sequelize.sync();
passportConfig(passport);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 20,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout.ejs');
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
app.use('/admin', adminRouter);

app.use('/article', articleRouter);
app.use('/api/article', articleAPIRouter);

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
