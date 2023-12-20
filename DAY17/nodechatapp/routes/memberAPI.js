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
  res.json(memberList);
});

router.post('/create', async (req, res, next) => {
  const { member_id, user_id, name, age } = req.body;

  const newMember = {
    member_id,
    user_id,
    name,
    age,
  };
  const updatedMemberList = [...memberList, newMember];

  res.json(updatedMemberList);
});

router.post('/modify', async (req, res, next) => {
  const getMember = memberList.find(
    member => member.member_id == req.body.member_id
  );

  res.json(getMember);
});

router.post('/delete', async (req, res, next) => {
  const updatedmemberList = memberList.filter(
    member => member.member_id !== req.body.member_id
  );

  res.json(updatedmemberList);
});

router.get('/:id', async (req, res, next) => {
  const findId = req.params.id;

  res.json(memberList[findId]);
});

module.exports = router;
