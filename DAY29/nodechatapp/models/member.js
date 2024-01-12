module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'member',
    {
      member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '사용자 고유 번호',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '사용자 이메일',
      },
      member_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '사용자 패스워드',
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '사용자 이름',
      },

      profile_img_path: {
        type: DataTypes.STRING(300),
        allowNull: false,
        comment: '사용자 프로필 이미지 경로',
      },
      entry_type_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '가입 유형 코드',
      },
      use_state_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '가입 상태 코드',
      },
      birth_date: {
        type: DataTypes.STRING(6),
        allowNull: false,
        comment: '생년월일',
      },

      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '등록일시',
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '등록자 고유 번호',
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
      tableName: 'member',
      timestamps: false,
      comment: '사용자 정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'member_id' }],
        },
      ],
    }
  );
};
