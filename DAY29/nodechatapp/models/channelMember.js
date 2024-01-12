module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'channel_member',
    {
      channel_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '채널 고유 번호',
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '사용자 고유 번호',
      },
      nick_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '사용자 닉네임',
      },

      member_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '사용자 유형',
      },

      active_state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '접속 상태 코드',
      },
      last_contact_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '최근 접속 일시',
      },
      last_out_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '최근 아웃 일시',
      },
      connection_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '커넥션 아이디',
      },

      ip_address: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '아이피 주소',
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
      tableName: 'channel_member',
      timestamps: false,
      comment: '채널 정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'channel_id' }],
        },
      ],
    }
  );
};
