/***
 * 콜백 함수 구현 및 테스트
 */

function fnPlus(a, b) {
  let result = a + b;
  logging(result);
}

function logging(result) {
  console.log(`계산 반환 값 ${result}`);
}

// 계산 함수 호출하기
// const result = fnPlus(10, 20);
// console.log('반환 값', result);

// 콜백 함수 방식으로 기능 구현하기
// 기존 logging함
function fnPlus1(a, b, callBack) {
  const result = a + b;
  callBack(result);
  return result;
}

function logging1(result) {
  // 기본 배송비 추가
  const total = 3000 + result;
  console.log(`기본 배송비를 추가한 값 :${total}`);
}

// const result1 = fnPlus1(10, 20, logging);
const result2 = fnPlus1(50, 10, logging1);

// 직접 구현
const result3 = fnPlus1(50, 20, result => {
  const total = 3000 + result;
  console.log(`기본 배송비를 추가한 값 :${total}`);
});

/**
 * - 콜백함수의 목적
 *   - 비동기 방식으로 처리되는 JS 프로그래밍에서, 절차적인 로직인 프로그래밍을 위해서 콜백함수를 사용한다.
 *     특정 기능을 구현하는 함수에다 특정함수를 매개변수로 전달해, 함수 내의 특정 위치에서 절달된
 *     콜백함수를 실행시켜 원하는 로직을 절차적으로 구현할 수 있다.
 */

/***
 * - 콜백함수의 장점
 *   - 유연하다.
 */

/***
 * - 객체지향 프로그래밍 (OOP / Object Oriented Programming)의 주요 개념
 *    - 일반화: 클래스와 객체
 *             - 객체(실체)
 *             - 클래스: 실체하는 물체의 공통 속성을 일반화 시킨 개념
 *                - 추상화, 상속, 다형성, 캡슐화
 *                    - 추상화(asbstraction): 상속과 인터페이스
 *                        - 상속: 부모 클래스의 속성을 물려 받는 것
 *                        - 인터페이스: 구현해야하는 구조만 정의만하고 구현은 하지 않는다.
 *    - 콜백함수는 OOP의 인터페이스 개념으로 구현한 것이다.
 */
