// base1 모듈에서 제공해주는 각종 상수와 함수 참조

const { odd, even, test } = require('./base1.js');
// 다른 모듈 혹은 설치된 노드 패키지의 기능을 참조하기 위해 require를 사용함

// 숫자를 매개변수로 받아서, 해당 값이 혹수인지 짝수인지 확인후, 홀수와 짝수에 대한 안내 메시지를 반환
function checkOddorEven(num) {
  // num % 2 값은 0 아니면 1이 반환된다.
  // true는 1 false는 0과 동일하게 평가된다.
  if (num % 2) {
    // 모든 언어에서 %는 특정 값을 특정 값으로 나눈 나머지값을 구할 때 사용한다.
    return odd;
  }
  return even;
}

// 모듈의 기능과 속성을 외부에 제공할 때, 단일한 형태로도 노출이 가능하다.
module.exports = checkOddorEven;
