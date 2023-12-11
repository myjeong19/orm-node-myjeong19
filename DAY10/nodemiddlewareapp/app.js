// 각종 노드 패키지 참조

// 서버 상 에러 발생시, 에러 처리를 위한 함수 참조
var createError = require('http-errors');

var express = require('express');

// path 노드 프레임워크 파일/폴더 경로 정보를 추출하는 패키지를 참조합니다.
var path = require('path');

// 웹 서버에서 발급해주는 쿠키 파일에 대한 정보를 추출하는 cookie-parser 패키지를 참조
var cookieParser = require('cookie-parser');

// morgan 이라는 노드 패키지를 통해 사용자 이벤트(요청과 응답) 정보를 로깅(이력활동 정보 저장)하는 패키지 참조
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

// express 객체를 이용해 노드 애플리케이션 객체를 생성합니다.
// app은 backend Node application 그 자체입니다.
var app = express();

// 개발자 정의 미들웨어 함수 기능 구현
// app이 만들어지고 모든 사용자 요청 발생시, 미들웨어 함수가 실행됨
app.use((req, res, next) => {
  console.log('어플레키이션 미들웨어 함수 호출 1:', Date.now());
  next();
  // 다음으로 이동할지, 여기서 멈출지에 대한 제어
});

// view engine setup

// node appliocation 최초 실행시, 서비스 환경 세팅 처리
// MVC 패턴 기반 각종 VIEW 파일이 존재하는 물리적 views 폴더의 위치를 설정해줍니다.
app.set('views', path.join(__dirname, 'views'));
// MVC에서 사용하는 ViewEngine 기술로 ejs를 사용한다고 설정
app.set('view engine', 'ejs');

// app.use()는 미들웨어로 사용자 요청이 발생할 때마다 실행되는 어플리케이션 미들웨어 함수
// app.use() 는 특정 사용자의 요청과 응답이 발생 시, 호출 되는 기능

app.use(logger('dev'));

// json 기능 참조
app.use(express.json());

// 한글 깨짐 방지 설정
app.use(express.urlencoded({ extended: false }));

// 쿠키파싱
app.use(cookieParser());

// public 폴더 기본 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 개발자 정의 라우팅 미들웨어
// http://localhost:3000/user/myjeong19
app.use('/user/:id', (req, res, next) => {
  const uid = req.params.id;
  console.log('어플리케이션 미들웨어 호출2:', req.method);
  res.send(`<h1>사용자 아이디 ${uid}</h1>`);
});

// 라우터 파일에 대한 기본 경로 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);

// catch 404 and forward to error handler
// 사용자 요청에 대한 요청을 못찾거나, 리소스를 찾지 못하는 경우,
// 404 에러를 웹 브라우저에게 전달해주는 미들웨어 함수
// 대부분 사용자 요청과 응답은 상기 기본 또는 개발자 정의 라우터 파일에서 처리가 되어지고,
// 처리 되지 못한 사용자 요청은 404 미들웨어에서 처리됩니다.
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
/**
 * MVC 패턴 노드 백엔드 환경에서의 서버 에러 발생시, 처리해주는 전역 예외 처리기 기능 제공
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
