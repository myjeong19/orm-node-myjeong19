module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'article',
    {
      article_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '게시글 고유 번호',
      },

      board_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '게시판 구분 코드',
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '게시글 제목',
      },
      article_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '게시글 유형 코드',
      },

      contents: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        comment: '글 내용',
      },

      view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '조회수',
      },
      ip_address: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'IP 주소',
      },
      is_display_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '게시 상태 코드',
      },

      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '등록일시',
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '등록자 고유번호',
      },

      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '수정일시',
      },
      edit_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '수정자 고유 번호',
      },
    },
    {
      sequelize,
      tableName: 'article',
      timestamps: false,
      comment: '게시글 정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'article_id' }],
        },
      ],
    }
  );
};
