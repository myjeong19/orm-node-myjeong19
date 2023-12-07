var express = require('express');
var router = express.Router();

// 상품 목록 웹 페이지
router.get('/list', async (req, res) => {
  res.render('product/list');
});

// 상품 상세보기 웹 페이지 query string 방식
router.get('/detail', async (req, res) => {
  // URL에 쿼리스트링 방식으로 전달된 값 추출하기
  const productId = req.query.pid;
  const productName = req.query.pname;
  res.render('product/detail', { productId, productName });
});

module.exports = router;
