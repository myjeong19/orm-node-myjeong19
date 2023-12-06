# Node module

- 모듈 (module)

  - **개발 생산성의 효율성**과 **편리한 유지보수**를 위해 관심사(복잡한 코드를 사용 용도,  
    제공 기능) 단위로 분리하여 코드 재사용하기 위한 기본 단위로 사용
    - 노드 기반 코드의 관심사의 분리 및 코드 재사용성을 극대화 해주는 방식 중 하나 (DRY한 코딩 철학 반영)
      - DRY? Don't Repeat Yourself

- 모듈 파일을 참조하여 모듈 내 정의된 속성과 기능을 쉽게 재활용 가능
- 파일의 확장자는 ~.js로 참조시 확장자는 주로 생략 가능함

- 정의 및 참조
  - 확장자는 생략가능하다.
  - exports 를 사용해 모듈 내 속성과 기능을 외부로 노출할 수 있다.
  - import나, require를 통해, 다른 모듈의 속성과 기능을 참조할 수 있다.
    - Node에서는 import보다 require 키워드를 통해 주로 모듈 참조를 호출한다.
  - 모듈 스코프를 통해 모듈내 정의된 변수는 해당 모듈에서만 기본적으로 사용 가능하다.

> 💡 모든 백엔드의 공통점은 두가지가 있다고 생각할 수 있다.
>
> 1. 백엔드 개발언어는 백엔드 웹 개발 프레임워크를 이용해서 개발한다.
>
>    - 웹 개발 기반 프레임워크를 사용하는 이유
>      - 개발 생산성과, 효율성을 가져올 수 있다.
>      - 구현해야하는 핵심적인 기능들을 제공한다.
>
> 2. MVC 개발 패턴을 이용해 개발한다.
> 3. ORM 기법을 사용해 DB처리를 한다.

---

- 개발 로드맵
  <img src="./img/스크린샷 2023-12-04 오후 12.36.12.png" width='300'/>