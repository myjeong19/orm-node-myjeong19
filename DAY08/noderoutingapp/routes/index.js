var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', (req, res) => res.render('index', { title: 'Main' }));

// 비동기 프로그래밍의 절차 중심 기능 개발시 Promise 혹은, async/await 이란 방식을 이용하면
// 비동기 프로그래밍 환경에서 순차적 프로그래밍이 가능하다.
router.get('/index', async (req, res) => {
  res.render('index', { title: 'Index' });
});

/**
 * 기능: 상품 목록 데이터
 * 요청 방식: GET
 * 요청 주소: http://localhost3000/api/products
 * 응답 결과: JSON 데이터 상품 목록
 */

router.get('/products', async (req, res) => {
  const products = [
    { pid: 1, pname: '엘지 노트북', price: 5000, stock: 4 },
    { pid: 2, pname: '삼성 노트북', price: 6000, stock: 2 },
    { pid: 3, pname: '애플 노트북', price: 7000, stock: 2 },
  ];

  // res.json()는 지정한 json 데이터를 브라우저로 전송해준다.
  // res.json('json') json을 배열, 단일객체 상관 없이 받을 수 있다.
  res.json(products);
});

module.exports = router;
