module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'article_file',
    {
      article_file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '게시글 첨부 파일 고요 번호',
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '참조하는 게시글 고유번호 FK',
      },
      file_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '확장자 포함 파일명',
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '파일 크기',
      },
      file_path: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '전체 파일 링크 경로 (도메인 포함 or 미포함)',
      },

      file_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '파일 형식',
      },

      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '등록일시',
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '등록자고유번호',
      },
    },
    {
      sequelize,
      tableName: 'article_file',
      timestamps: false,
      comment: '게시글 파일 정보 테이블',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'article_file_id' }],
        },
      ],
    }
  );
};
