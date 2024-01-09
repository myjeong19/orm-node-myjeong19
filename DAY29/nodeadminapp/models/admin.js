module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'admin_member',
    {
      admin_member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '관리자 고유번호',
      },
      company_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '소속회사 코드 1- 자회사, 2- 협력 업체',
      },
      admin_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '관리자 계정 아이디',
      },
      admin_member_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '관리자 계정 비밀번호',
      },
      admin_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '관리자 이름',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '관라자 이메일',
      },
      telephone: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '전화번호',
      },
      dept_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '부서',
      },
      used_yn_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '사용 여부 1-사용중, 0-사용불가',
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
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '수정일시',
      },
      edit_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '수정자고유번호',
      },
    },
    {
      sequelize,
      tableName: 'admin_member',
      timestamps: false,
      comment: '관리자 정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'admin_member_id' }],
        },
      ],
    }
  );
};
