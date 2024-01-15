var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
var db = require('../models/index.js');

//사용자 토큰제공여부 체크 미들웨어 참조하기
var { tokenAuthChecking } = require('./apiMiddleware.js');

//사용자 로그인 체크 미들웨어 참조
var { loginUserCheckMiddleware } = require('./loginUserCheckMiddleware.js');

/* 
-신규회원 가입처리 RESTFul API 라우팅 메소드 
-http://localhost:3000/api/member/entry
*/
router.post('/entry', async (req, res, next) => {
  const apiResult = {
    code: 400,
    data: null,
    resultMsg: '',
  };

  try {
    const { email, password, name, telephone } = req.body;

    //회원가입 로직추가: 메일주소 중복체크
    const existMember = await db.Member.findOne({ where: { email } });

    //회원 가입시 위에 로직중 이메일이 있다면 이미 있는 회원 이메일이라고 검증 하고
    if (existMember != null) {
      apiResult.code = 500;
      apiResult.data = null;
      apiResult.resultMsg = 'ExistDoubleEmail';
    } else {
      //단방향 암호화 해시 알고리즘 적용 사용자 암호 암호화 적용
      const encryptedPassword = await bcrypt.hash(password, 12);

      const encryptedTelephone = AES.encrypt(
        telephone,
        process.env.MYSQL_AES_KEY
      );

      const member = {
        email,
        member_password: encryptedPassword,
        name,
        profile_img_path: '',
        telephone: encryptedTelephone,
        entry_type_code: 1,
        use_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: 0,
      };

      const registedMember = await db.Member.create(member);

      //불필요한 중요 데이터 속성값은 지우고 프론트엔드에 전달
      registedMember.member_password = '';
      registedMember.telephone = AES.decrypt(
        registedMember.telephone,
        process.env.MYSQL_AES_KEY
      );

      apiResult.code = 200;
      apiResult.data = registedMember;
      apiResult.resultMsg = 'Ok';
    }
  } catch (err) {
    console.log('서버에러발생-/api/member/entry:', err.message);
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.resultMsg = 'Failed';
  }

  res.json(apiResult);
});

/* 
-회원 로그인 처리 RESTFul API 라우팅 메소드 
-http://localhost:3000/api/member/login
*/
router.post('/login', async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    resultMsg: '',
  };

  try {
    const { email, password } = req.body;

    //step1:로그인(인증)-동일메일주소 여부 체크
    const member = await db.Member.findOne({ where: { email: email } });
    var resultMsg = '';

    if (!member) {
      resultMsg = 'NotExistEmail';
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.resultMsg = resultMsg;
    } else {
      var compareResult = await bcrypt.compare(
        password,
        member.member_password
      );
      if (compareResult) {
        resultMsg = 'Ok';
        member.member_password = '';
        member.telephone = AES.decrypt(
          member.telephone,
          process.env.MYSQL_AES_KEY
        );

        //step3: 인증된 사용자의 기본정보 JWT토큰 생성 발급
        //step3.1: JWT토큰에 담을 사용자 정보 생성
        //JWT인증 사용자정보 토큰 값 구조 정의 및 데이터 세팅
        const { member_id, email, name, profile_img_path, telephone } = member;

        const memberTokenData = {
          member_id,
          email,
          name,
          profile_img_path,
          telephone,
          etc: '기타정보',
        };

        const token = await jwt.sign(memberTokenData, process.env.JWT_SECRET, {
          expiresIn: '3h',
          issuer: 'myjeong19',
        });

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.resultMsg = resultMsg;
      } else {
        resultMsg = 'NotCorrectPassword';

        apiResult.code = 400;
        apiResult.data = null;
        apiResult.resultMsg = resultMsg;
      }
    }
  } catch (err) {
    console.log('서버에러발생-/api/member/entry:', err.message);
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.resultMsg = 'Failed';
  }
  res.json(apiResult);
});

/* 
-회원 암호 찾기 RESTFul API 라우팅 메소드 
-http://localhost:3000/api/member/find
*/
router.post('/find', async (req, res, next) => {
  res.json({});
});

/* 
-로그인한 현재 사용자의 회원 기본정보 조회 API  
-http://localhost:3000/api/member/profile
-로그인시 발급한 JWT토큰은 HTTP Header영역에 포함되어 전달된다.
*/
router.get('/profile', tokenAuthChecking, async (req, res, next) => {
  var apiResult = {
    code: 400,
    data: null,
    resultMsg: '',
  };

  try {
    //step1: 웹브라우저 헤더에서 사용자 JWT Bearer 인증토큰값을 추출한다.
    //req.headers.authorization = "Bearer FHKDFJDKJFKDJFKSJFSK"
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
      apiResult.code = '400';
      apiResult.data = 'notprovidetoken';
      apiResult.resultMsg = '인증토큰이 제공되지 않았습니다.';
      return res.json(apiResult);
    }

    const tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

    //웹브라우저에서 전달된 JWT토큰문자열에서 필요한 로그인 사용자 정보를 추출합니다.
    const loginMemberId = tokenJsonData.member_id;

    const dbMember = await db.Member.findOne({
      where: { member_id: loginMemberId },
      attributes: [
        'email',
        'name',
        'profile_img_path',
        'telephone',
        'birth_date',
      ],
    });

    dbMember.telephone = AES.decrypt(
      dbMember.telephone,
      process.env.MYSQL_AES_KEY
    );

    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.resultMsg = 'Ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.resultMsg = 'Failed';
  }

  res.json(apiResult);
});

module.exports = router;
