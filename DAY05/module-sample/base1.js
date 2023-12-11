const odd = '홀수입니다.';
const even = '짝수입니다.';

function test() {
  console.log('Base1 모듈의 test()함수가 호출되었습니다.');
}

console.log('Base모듈이 호출되었습니다.');

// base1 모듈에서 정의된 각종 상수 변수, 기능을 외부로 노출해야 기능을 제공할 수 있다.
module.exports = {
  odd,
  even,
  test,
};
// module.export를 통해, 객체 형태로 해당 모듈의 기능과 속성을 노출한다.
