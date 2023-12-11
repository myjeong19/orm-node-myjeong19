var express = require('express');
var router = express.Router();

// 미들웨어 함수 참조하기
const { checkParams, checkQueryKey } = require('./middleware');

//라우터 미들웨어 함수 샘플3
// index.js 라우터가 실행 될 때 마다 실행되는 미들웨어 함수
router.use((req, res, next) => {
  console.log(
    'Index.js 라우터 미들웨어 함수 샘플 1:',
    Date.now().toLocaleString()
  );
  next();
});

// 해당 라우터에서 해당 호출 주소체계와 일치하는 경우 매번 실행되는 미들웨어 함수
router.use(
  '/sample/:id',
  async (req, res, next) => {
    console.log('Index 라우터 미들웨어 함수 2-Request.URL', req.originalUrl);
    // Url을 가져오고 싶을 때
    next();
  },
  (req, res, next) => {
    console.log('Index 라우터 미들웨어 함수 3-Request Type:', req.method);
    res.send(req.method);
    next();
  }
);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// 파라미터 id 값이 존재하는 체크하는 미들웨어 함수 적용하기
router.get('/test/:id', checkParams, (req, res, next) => {
  res.render('index', { title: 'Middleware test/myjeong19' });
});

// 쿼리스트링 category 키 값이 존재하는지 체크하는 미들웨어 함수 적용하기
// http://localhost:3000/product?category=computer&stock=100
router.get('/product', checkQueryKey, (req, res, next) => {
  res.render('index', { title: 'Middleware' });
});

module.exports = router;
