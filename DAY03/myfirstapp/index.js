// 설치한 오픈소스 노드 패키지 참조
// node.js에서는 require() 예약어를 통해 설치된 패키지를 참조한다.
// moment 패키지는 JS 일자/시간 정보를 개발자가 원하는 문자 포맷으로 표현햐주는 기능 제공
const moment = require('moment');

// dotenv 패키지는 해당 프로젝트의 환경 설정 정보에 접근해
// 전역 환경 변수 정보를 추출한다.

// .env 파일 환경 변수를 Key 와 Value 값으로 정의
const env = require('dotenv');

// 프로젝트 루트에 있는 .env 환경 설정 파일에 정의된 환경 변수를 메모리에 적재
env.config();

// .env 파일 내 특정 환경변수 정보 추출
const companyName = process.env.COMPANY_NAME;
// CPU안 process에 의해 각종 어플리케이션들이 관리
// 그 안에 스레드가 프로그램을 관리
// Node 는 하나의 스레드 안에 하나의 어플리케이션을 적재함
// 이를 싱글스레드라함

// 카멜식 표기법 camelCase
console.log('COMPANY_NAME', companyName); // 오름

// 순수 JS 일시/ 시간 정보 출력
// console.log('순수 자바스크립트 일시 정보', Date.now());

// moment 패키지 이용해 JS 일시 정보 출력
// console.log('moment 일시 정보', moment().add(3, 'days').calendar());

// 모듈 파일
// 서버에서 작동되는 서버 파일

// console.log('최초 생성한 노드 백엔드 자바스크립트 모듈 파일입니다.');
/*  문자열 표현 - '',"",`` 중요한 것은 통일성
        - 팀프로젝트시, 미리 정하고 하는 것이 좋다 
*/

// `node` 자바스크립트 모듈을 실행 시키는 명령어
// console.log('로그가 잘 출력되네요.');
// 중단점(break point)
// F10 키를 누르면 한줄씩 실행됨
// F5 마지막까지 한번에 실행
// console.log('배고파 죽겠어요.');
// 중단점이 있으면 F5도 걸림

// 디버거 - 디버깅을 도와줌
