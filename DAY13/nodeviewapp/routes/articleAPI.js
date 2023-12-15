var express = require('express');
var router = express.Router();

// 전체 게시글 조회
router.get('/all', async (req, res) => {
  // API 라우팅 메소드 반환 형식 정의
  const apiResult = {
    // 정상적인 응답 200
    code: '200',
    // 게시글 목록 데이터를 data 속성에 담아서 줌.
    data: [],
    result: 'OK',
  };
  //   예외 처리
  try {
    //   STEP1 : DB에서 전체 게시글 목록 데이터 조회
    const articles = [
      {
        article_id: 1,
        board_type_code: 1,
        title: '2023년 12월 14일 18시 임시점검',
        contents: '임시 점검 실시 예정입니다.',
        view_count: 121,
        ip_address: '111.111.111.11',
        is_display_code: 1,
        reg_date: '2023-12-13',
        reg_member_id: 'myjeong19',
      },
      {
        article_id: 2,
        board_type_code: 2,
        title: '안녕하세요 정민영입니다.',
        contents: '환영합니다.',
        view_count: 1,
        ip_address: '111.111.111.11',
        is_display_code: 0,
        reg_date: '2023-12-14',
        reg_member_id: 'myjeong19',
      },
    ];

    apiResult.code = 200;
    apiResult.data = [...articles];
    apiResult.result = 'OK';
  } catch (error) {
    // console.log(error.message)
    // 서버측 에러코트는 사용자에게 직접 제공하지 않고 대표 메시지를 안내한다.
    // 에러코드는 추후 별도 로깅 시스템 구현을 통해 서버에 특정 폴더내에 로그 파일 기록 혹은,
    // 에러발생 알림 시스템(sms,email)을 통해 실시간 에러 정보를 노티한다.
    apiResult.code = 500;
    apiResult.date = null;
    apiResult.result = 'FAILED';
  }

  res.json(apiResult);
});

// 신규 게시글 등록 처리
router.post('/create', async (req, res) => {
  const apiResult = {
    code: '200',
    data: [],
    result: 'OK',
  };

  try {
    const {
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
    } = req.body;

    // STEP2: 추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서, DB article테이블에 영구 저장 처리

    const article = {
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
      regist_date: new Date(),
    };

    const savedArticle = {
      board_type_code: '1',
      title: '긴급 점검',
      contents: 'TEST!!! TEST!!! TEST!!!',
      article_type_code: '1',
      is_display_code: '1',
      register: 'myjeong19',
      regist_date: new Date(),
    };

    apiResult.code = 200;
    apiResult.data = savedArticle;
    apiResult.result = 'OK';
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'FAILED';
  }

  res.json(apiResult);
});

// 단일 게시글 수정 처리
router.post('/update', async (req, res) => {
  const apiResult = {
    code: '200',
    data: [],
    result: 'OK',
  };

  try {
    const articleIdx = req.body.articleIdx;
    let {
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
    } = req.body;

    // STEP2: 추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서, DB article테이블에 영구 저장 처리

    let article = {
      articleIdx,
      board_type_code,
      title,
      contents,
      article_type_code,
      is_display_code,
      register,
      regist_date: new Date(),
    };

    let affectedCnt = 1;
    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = 'OK';
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'FAILED';
  }

  res.json(apiResult);
});

// 단일 게시글 목록 데이터 조회
router.get('/:aidx', async (req, res) => {
  const apiResult = {
    code: '200',
    data: [],
    result: 'OK',
  };

  try {
    // STEP1 :URL을 통해 전달된 게시글 고유 번호 추출
    const articleIdx = req.params.aidx;
    // STEP2 :게시글 고유번호에 해당하는 단일 게시글 정보를 DB에서 조회

    const savedArticle = {
      board_type_code: '1',
      title: '긴급 점검',
      contents: 'TEST!!! TEST!!! TEST!!!',
      article_type_code: '1',
      is_display_code: '1',
      register: 'myjeong19',
      regist_date: new Date(),
    };

    apiResult.code = 200;
    apiResult.data = savedArticle;
    apiResult.result = 'OK';
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'FAILED';
  }

  res.json(apiResult);
});

// 단일 게시글 삭제
router.delete('/:aidx', async (req, res) => {
  const apiResult = {
    code: '200',
    data: [],
    result: 'OK',
  };

  try {
    // STEP1 :URL을 통해 전달된 게시글 고유 번호 추출
    const articleIdx = req.params.aidx;
    // STEP2 :DB의 article 테이블에서 해당 게시글 번호글을 삭제 처리

    // STEP3 :DB에서 삭제된 건수 전달
    const deletedCnt = 1;

    // STEP4 :정상 삭제된 정보 할당
    apiResult.code = 200;
    apiResult.data = deletedCnt;
    apiResult.result = 'OK';
  } catch (error) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'FAILED';
  }

  res.json(apiResult);
});

module.exports = router;
