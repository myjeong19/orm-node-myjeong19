USE modu_chat1;

# member 테이블 전체 컬럼(*) 데이터 조회
SELECT * FROM member;

# CREATE - INSERT
# INSERT INTO member(column)VALUES(data);
INSERT INTO member(email, member_password, name, profile_img_path, telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('myjeong19@naver.com', '1234', '정민영', '','010-3957-3540', 1, '1', '980319', now(), 1);

INSERT INTO member(email, member_password, name, profile_img_path, telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('myjeong191@naver.com', '1234', '정민영1', '','010-3957-3540', 1, '1', '980319', now(), 1);

INSERT INTO member(email, member_password, name, profile_img_path, telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('myjeong192@naver.com', '1234', '정민영2', '','010-3957-3540', 1, '1', '980319', now(), 1);

# READ - SELECT
SELECT * FROM member;
SELECT * FROM member WHERE email = 'myjeong19@naver.com';
SELECT * FROM member WHERE entry_type_code = 1 AND name = '정민영';
SELECT * FROM member WHERE entry_type_code = 1 OR use_state_code = 0;
SELECT * FROM member WHERE member_id >= 3; 
SELECT member_id, email, name, telephone FROM member WHERE member_id >= 3;
SELECT * FROM member WHERE name IN('정민영','정민영1','정민영2'); # JS filter()
SELECT * FROM member WHERE name LIKE '%정%'; # 패턴 매칭 JS include()?
SELECT * FROM member ORDER BY member_id DESC; # 역순
SELECT * FROM member ORDER BY member_id ASC; # 정렬

# UPDATE - UPDATE
UPDATE member SET name= '정민영-', profile_img_path='http://naver.com/images/test.png' WHERE member_id = 1;
UPDATE member SET use_state_code = 0 WHERE member_id > 2;

# DELETE - DELETE
DELETE FROM member WHERE email='myjeong19@naver.com';
SELECT * FROM member;
