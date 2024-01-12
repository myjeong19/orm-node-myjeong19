const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AES = require('mysql-aes');
const db = require('../models/index');

const handleApiReulst = (code, data, msg) => {
  let apiReulst = {
    code,
    data,
    msg,
  };
  return apiReulst;
};

// POST
// /api/member/login
router.post('/login', async (req, res, next) => {
  let apiReulst = handleApiReulst(400, null, '');
  let resultMsg = '';

  try {
    const { email, password } = req.body;
    const member = await db.findOne({ where: { email: email } });

    if (!member) {
      resultMsg = '유효한 이메일을 입력해주세요.';
      apiReulst = handleApiReulst(400, null, resultMsg);
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        member.member_password
      );

      if (comparePassword) {
        member.member_password = '';
        member.telephone = AES.decrypt(
          member.telephone,
          process.env.MYSQL_AES_KEY
        );
        apiReulst = handleApiReulst(200, member, 'OK');
        resultMsg = '성공';
      } else {
        resultMsg = '비밀번호가 유효하지 않습니다.';
        apiReulst = handleApiReulst(400, null, resultMsg);
      }
    }
  } catch (error) {
    console.log('/api/member/entry ERROR', error.message);
    apiReulst = handleApiReulst(500, null, 'FAILED');
  }

  res.json({ apiReulst });
});

// /api/member/entry
router.post('/entry', async (req, res, next) => {
  let apiReulst = handleApiReulst(400, null, '');

  try {
    const { email, name, password, profile_img_pass, telephone, birth_date } =
      req.body;

    // 중복 이메일 검사
    const existMember = await db.Member.findOne({ where: { email } });
    if (existMember) {
      apiReulst = handleApiReulst(500, null, '');
    } else {
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    const encryptedTelephone = AES.encrypt(
      telephone,
      process.env.MYSQL_AES_KEY
    );

    const newMember = {
      email,
      name,
      member_password: encryptedPassword,
      profile_img_pass,
      telephone: encryptedTelephone,
      birth_date,
      entry_type_code: 1,
      use_state_code: 1,
      reg_date: Date.now(),
      reg_member_id: 1,
    };

    await db.Member.create(newMember);

    // 불필요한 중요 데이터 속성 값은 지우고 프론트엔드에 전달
    newMember.member_password = '';
    newMember.telephone = AES.decrypt(
      newMember.telephone,
      process.env.MYSQL_AES_KEY
    );

    apiReulst = handleApiReulst(200, newMember, 'OK');
  } catch (error) {
    console.log('/api/member/entry ERROR', error.message);
    apiReulst = handleApiReulst(500, null, 'FAILED');
  }

  res.json({ apiReulst });
});

// /api/member/find
router.post('/find', async (req, res, next) => {
  res.json({});
});

module.exports = router;
