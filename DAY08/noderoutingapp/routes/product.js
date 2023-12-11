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
  // URL 에 Query String 방식으로 파라미터가 전달되면 req.query.key 명으로 key 값을 추출할 수 있다.
  const productName = req.query.pname;
  res.render('product/detail', { productId, productName });
});

// 와일드 카드 사용시 주의사항
// 동일한 URL 호출 주소와 호출 방식 GET 의 라우팅 메소드가 존재하는 경우
// 와일드 카드 방식이 먼저 호출 되고, 다른 라우팅 메소드는 호출이 무시된다.
// 주소 :localhost:3000/product/detail/sample
// 방식: GET
router.get('/detail/sample', async () =>
  res.render('product/detail', { productId: 100, productName: '노트북' })
);

// 호출 주소: //localhost
router.get('/detail/sendall', async (req, res) => {
  // 문자열 데이터 보내기
  // res.send(`<h1>안녕하세요</h1>`);
  // res.send({ uid: 'myjeong19', username: '정민영' });

  // const htmlTag = `
  // <html>
  //   <body>
  //     <h1>샘플 웹 페이지 1</h1>
  //   </body>
  // </html>`;
  // res.send(htmlTag);

  // 서버에 저장된 파일을 다운로드 해보자
  // console.log('__dirname 물리적 경로 확인', __dirname + 'test.jpg');
  res.sendFile(__dirname + '/test.jpg');
  // __dirname 현재 작업중인 폴더의 물리적인 경로
});

// 파라미터 방식으로 전달된 상품 정보를 추출해 단일 상품 정보 보여주기
// 호출 주소: localhost:3000/product/detail/1
// 호출 방식: GET
/**
 * 와일드카드 방식으로 주소 체계가 정의된 라우팅 메소드는 해당 라우터 파일의 맨 하단에 반드시 배치시켜야한다.
 */
router.get('/detail/:pid', async (req, res) => {
  const productId = req.params.pid;

  // URL을 통해 파라미터 방식으로 값일 전달되면
  // 주소 체계내 와일드 카드 키를 설정하고, 해당 키명으로 URL을 통해 전달된 파라미터 값을 추출할 수 있다.
  // req.params.와일드카드 키명

  res.render('product/detail', { productId, productName: '노트북' });
});

// 여러개의 파라미터를 여러개의 와일드카드 키명으로 정의해서 값을 추출해보자
router.get('/detail/:pid/:pname/:price', async (req, res) => {
  var productId = req.params.pid;
  var productName = req.params.pname;
  var price = req.params.price;

  res.render('product/detail', { productId, productName, price });
});

module.exports = router;
