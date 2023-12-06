// 2. index.js: 샘플 웹사이트의 공통 사용자 요청과 응답을 처리해준느 라우팅 파일

// 3. express 패키지 참조
var express = require('express');
/**
 * 4. express Router()메소드 호출해 router 객체 생성
 * router 객체는 모든 사용자의 요청과 응답을 처리하는 핵심 객체입니다.
 */
var router = express.Router();

router.get('/main', (req, res) => res.render('main'));

/**
 * 1. 샘플 노드 익스프레스 웹 사이트의 메인 페이지 요청과 응답처리 라우팅 메소드
 * 호출 주소 체계는 http://localhost:3000/
 */

/**
 * 10. router.get()는 사용자 클리이언트에서 직접 URL을 입력해서 최초 호출 혹은,
 * 각종 링크 주소를 클릭 시, 발생함
 * 사용자가 url을 통해, 서버에 무언가를 요청할 시, 요청 방식이 존재한다.
 * 요청 방식은 : GET, POST, PUT, DELETE ... 등이 있다.
 * 일반적인 사이트의 접근은 GET
 * router.get('호출하는 주소', 호출된 주소에서 처리해야할 응답을 위한 콜백함수)
 * 요청을 받으면 콜백함수를 실행함.
 */
router.get('/', (req, res, next) => res.render('index', { title: 'MyJeong' }));

// 5. 회사 소개 웹 페이지 요청과 응답 처리 라우팅 메서드
// step1: 라우팅 메소드의 기본 호출 주소 체계를 정의한다.
router.get('/company', (req, res) =>
  /**
   * 11. req는 httpRequest 객체이고, 웹 브라우저 또는 클라이언트에서 넘어오는 각종 요청 정보
   * 웹 브라우저에서 웹 서버로 넘어오는 모든 정보가 담겨 있고 정보 추출 가능
   
   * 12. res는 httpResponse 객체로 웹 서버에서 클라이언트로 응답을 처리하는 객체
   * 웹 서버에서 클라이언트로 특정 정보를 전달하고 싶을 때는 res 객체를 사용한다
   * 주로 res를 이용해 서버상의 웹 페이지(View), 데이터(json)등을 전달
   
   * 13. res.render()는 views 폴더 내에 있는 지정한 view파일 내의 HTML 내용을 웹 브라우저로 전송.
   * res.render('views 폴더 내, 특정 파일, 전달할 데이터')
   */

  res.render('company/company', { companyName: 'Vercel', ceo: '정민영' })
);

// 6. 회사 연락처 정보 제공 웹 페이지
/**
 * 사용자 요청은 동일 추소 체계와 동일 요청 방식과 일치하는 라이퉁 메소드를 찾아,
 * 해당 메소드의 콜백함수가 실행되어 응답이 전달됩니다.
 */
router.get('/contact', (req, res) =>
  res.render('company/contact', {
    phone: '010-3957-3540',
    email: 'myjeong19@naver.com',
    address: '캘리포니아주 샌프란시스코',
  })
);

// 7. 회사 제품 소개 웹 페이지
router.get('/product/labtop', (req, res) => {
  const labtop = {
    productName: '맥북',
    brand: '애플',
    price: 1850000,
    img: 'https://www.apple.com/v/macbook-air-m1/f/images/meta/macbook-air_overview__15sjf4iagj6q_og.png',
  };
  res.render('company/product/labtop', { labtop });
});

// 8. 회사 대표 인삿말 웹 페이지
router.get('/company/intro', (req, res) => {
  res.render('company/intro');
});

// 9.반드시 라우터 파일에서는 해당 라우터 객체를 외부로 exports한다.
module.exports = router;
