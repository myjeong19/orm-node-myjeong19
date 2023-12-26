const express = require('express');
const router = express.Router();

const memberList = [
  {
    member_id: '1',
    user_id: 'myjeong19',
    name: '정민영',
    age: 25,
  },
  {
    member_id: '2',
    user_id: 'gildong-hong',
    name: '홍길동',
    age: 23,
  },
];

router.get('/all', async (req, res, next) => {
  try {
    res.json(memberList);
  } catch (error) {
    console.log('ERROR: 에러가 발생했습니다 관리자에게 문의하세요.');
  }
});

router.post('/create', async (req, res, next) => {
  const { member_id, user_id, name, age } = req.body;

  try {
    const newMember = {
      member_id,
      user_id,
      name,
      age,
    };
    const updatedMemberList = [...memberList, newMember];

    res.json(updatedMemberList);
  } catch (error) {
    console.log('ERROR: 에러가 발생했습니다 관리자에게 문의하세요.');
  }
});

router.post('/modify', async (req, res, next) => {
  try {
    const getMember = memberList.find(
      member => member.member_id == req.body.member_id
    );

    res.json(getMember);
  } catch (error) {
    console.log('ERROR: 에러가 발생했습니다 관리자에게 문의하세요.');
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const updatedmemberList = memberList.filter(
      member => member.member_id !== req.body.member_id
    );

    res.json(updatedmemberList);
  } catch (error) {
    console.log('ERROR: 에러가 발생했습니다 관리자에게 문의하세요.');
  }
});

router.get('/:id', async (req, res, next) => {
  const findId = req.params.id;
  console.log(req.params);
  try {
    res.json(memberList[findId]);
  } catch (error) {
    console.log('ERROR: 에러가 발생했습니다 관리자에게 문의하세요.');
  }
});

module.exports = router;
