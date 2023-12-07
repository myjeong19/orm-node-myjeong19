// 기본 호출 주소 /api/product/

var express = require('express');
var router = express.Router();

/**
 * 기능: 상품 목록 데이터
 * 요청 방식: GET
 * 요청 주소: http://localhost3000/api/product/list
 * 응답 결과: JSON 데이터 상품 목록
 */

router.get('/list', async (req, res) => {
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
