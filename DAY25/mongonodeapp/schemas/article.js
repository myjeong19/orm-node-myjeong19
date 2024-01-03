const mongoose = require('mongoose');
// 1. mongoose 패키지를 참조

const AutoIncrement = require('mongoose-sequence')(mongoose);
// 2. 자동 채번 기능
const { Schema } = mongoose;

const articleSchema = new Schema({
  // 3. Schema 클래스를 생성하 떄 생성자 함수에 새로만들 콜렉션의 스키마를 정의해서 콜렉션을 생성함
  title: {
    type: String,
    required: true,
  },
  article_type_code: {
    type: Number,
    required: true,
  },
  contents: {
    type: String,
    required: false,
  },
  view_count: {
    type: Number,
    required: true,
  },
  is_display_code: {
    type: Number,
    required: true,
  },
  ip_address: {
    type: String,
    required: false,
  },
  edit_date: {
    type: Date,
    default: Date.now,
  },
  edit_member_id: {
    type: Number,
    required: false,
  },
});

articleSchema.plugin(AutoIncrement, { inc_field: 'article_id' }); //article_id는 1,2,3,4..

module.exports = mongoose.model('Article', articleSchema);
// mongoose.model('이름', 구조 정의 클래스) 호출해 물리적인 콜렉션을 생성해줌
