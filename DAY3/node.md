# Node.js

## Version

- LTS (Long Term Support) 안정적인 버전

  - 3년간 안정적 사용환경 지원

- Current 개발중인 버전

---

## Node.js?

- V8엔진으로 빌드된 JS 런타임

  - 런타임: 특정 개발 언어로 만든 프로그램을 실행할 수 있는 환경

- 특징
  - 이벤트 기반 개발 모델
  - 논 블록킹 I/O 모델 제공
    - 동시 다발적으로 할 수 있다.
  - JS **오픈 소스 라이브러리 저장소** 생태계 제공
  - NPM(Node Package Manager)을 통한 노드 패키지 저장소 오픈 소스 로컬 관리

---

## 인터프리팅 언어를 사용하는 이유

- 낮은 러닝커브
  - 빠르게 가치 창출 할 수 있음
- 다양한 확장성

> HTML, CSS는 왜 서버에서 전달될까?
>
> - 접근할 수 있는 공유 저장소로 서버를 사용하는 것
>   - 도메인
>   - 요청에 대한 응답

## Node Package와 package.json 이해

- NPM = SW

  - Node Package: 특정 기능을 제공하는 JS/Node 모듈들의 집합체

    - Node Package 저장소: 세계 최대 재사용 가능한 노드(패키지들)와 JS 오픈 소스 저장소

  - npm : 각종 Node Package의 설치 및 설치된 패키지들을 관리해주는 SW

    - 노드 패키지 저장소에서 NPM명령어를 이용해 각종 패키지를 개발 또는 서비스 환경으로  
      설치하여 빠르게 오픈소스 패키지 기반 프로젝트 개발 및 서비스가 가능하다.

- package.json

  - 해당 패키지의 정보와 버전 및 설치된 각종 패키지 이력 정보를 관리하는 파일

    - Node.js 프로젝트는 하나의 .json 파일 생성이 필요하다.

      - 프로젝트 시작전 package.json 파일 생성 부터 시작
        - `npm init`

    - npm init
      - version 최초의 버전
      - desc 프로젝트 설명
      - entry point 최초 실행 모듈
      - git repository:
      - authot: 만든이
      - license: 라이센스 정책

- dependencies: 의존성  
  설치된 패키지들이 기록됨

- npm 명령어

  - `npm i 패키지명`: 신규 패키치 설치
  - `npm i 패키지 명 패키지 명 ...`: 여러 패키지들 동시 설치
  - node-modules 폴더: 명령어에 의해 설치된 실제 노드 패키지 소스들의 물리적 위치

  - `npm i` 노드 패키지 전체 재설치
  - package-lock.json: 설치된 패키지들 간의 의존/종속 관계 정보를 관리해줌
    - npm에 의해 자동으로 관리됨

- `npm uninstall 패키지명` 설치된 패키지 삭제
  - 개발한 것을 올릴 때 node_module을 삭제한다.

---

## 설치하는 노드 패키지의 용도 2가지

1. 서비스를 위한 개발 용도 패키지

   - 서비스를 위해 반드시 필요한 패키지
     - `npm i 패키지 명` or `npm i -g 패키지 명`
       - 전역 패키지 설치 `npm i -g 패키지명`

2. 개발할 때만 사용하는 패키지

   - 개발용 패키지
     - npm i 패키지명 --save -dev
     - devDependencies에서 의존함
   - 개발 생산성/ 효율성 제고를 위한 패키지 설치

---

## nvm

- nvm (Node Version Manager)

  - 용도: 동일한 컴퓨터에 여러 버전의 Node Framework를 설치하고 관리하고자 할 때 사용

  - `nvm ls`버전 목록 확인
  - `nvm install version` 버전 설치
  - `nvm uninstall version` 버전 제거

---

## ECMAScript

- ECMAScript?

  - Script 언어

    - 매우 빠르게 배우고 작성하기 위해 고안됨
    - 짧은 소스 코드 파일이나 간단한 프로그래밍 개발에 사용
    - JS,VBScript,ShellScript, 바닐라스크립트, 타입스크립트 등 다양한 스크립트 언어 존재
      - TS는 JS의 타입을 정의할 수 없는 불안정성을 보완하기 위해 나왔다.

  - JS 언어
    - 객체 기반 스크립트 프로그래밍 언어
    - 과거 주로 웹 브라우저 기반에서 웹 페이지 제어 및 기능 구현 언어로 사용됨 (2010년 이전까지)
    - 최근 서버측 동적 웹 프로그래밍 및 다양한 분야에서 사용
    - ECMAScript란?
      - ECMA 인터내셔널의 ECMA-262 기술 규격에 정의된 JS 언어 표준 스펙을 준수한 스크립트를 의미한다.
    - ES2015
      - 문법에 기존과 다른 큰 변화 발생
        새로운 기능과 문법들이 대거 추가되며 객체지향 프로그래밍 언어로 변모하게 됨.
    - 2015 이전엔 ES1,ES2... 등으로 명칭함
      - Node 프레임 워크로 인해, 백엔드 언어와 경쟁하기 시작하면서 년도 식 네이밍 표기법으로 변경됨

> HTML (Hypertext Markup Language)

> CSS (Cascading Style Sheets)

---
