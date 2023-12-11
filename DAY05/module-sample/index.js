const { odd, even } = require('./base1');
const checkOddorEven = require('./base2');

// 문자열 길이가 홀수인지 짝수인지 판단하는 함수
function checkStringLengtOddorEven(string) {
  if (string.length % 2) {
    return odd; // 홀수
  } else {
    return even; // 짝수
  }
}

console.log('해당 숫자는', checkOddorEven(10));
console.log('문자열 길이는', checkStringLengtOddorEven('반갑습니다?'));
