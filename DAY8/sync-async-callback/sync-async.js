/**
 * 1. 자바스크립트는 기본적으로 비동기 프로그래밍 방식으로 작동된다.
 */

// Activity1
function fn1() {
  console.log('=======>f1');
}

// A2 . 2s
function fn2(num) {
  console.log('=======>f2');

  if (!num) {
    fn31('fn2에서 호출');
  }

  if (num) {
    setTimeout(function () {
      console.log('1초: =======>f2');
    }, 1000);

    setTimeout(function () {
      console.log('2초: =======>f2');
    }, 2000);
  }
}

// A3.
function fn3() {
  console.log('=======>f3');
}
// A3-1.
function fn31(msg) {
  console.log('=======>f31:', msg);
}

// TASK 1.
// 순서와 상관 없이 함수가 호출만 되는 경우
// fn1();
// fn2(2000);
// fn3();

// 처리하는 순서를 정해야하는 경우를 위해 콜백함수가 나왔다.

// TASK 2. 순서를 지켜가면서 비지니스 로직을 구현해야하는 경우
fn1();
fn2();

// TASK 3. 함수 안에서 특정함수를 호출해 우선순위를 조절하는 경우,
// 함수가 바뀌거나 함수의 조건이 변경 되는 영향을 받을 때 마다 코드를 수정해야한다.

function fn4(fn, msg) {
  fn(msg);
}

function fn5(msg) {
  console.log(msg);
  console.log('Hi');
}

fn4(fn5, 'Hello');
