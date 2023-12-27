module.exports = function (sequelize, DataTypes) {
  /**
   * sequelize
   * define은 테이블이 있으면 해당 테이블이 존재하지, 않을 시 테이블을 생성한다
   * define(테이블 명, 컬럼 구조 정의, 생성 옵션)
   * 테이블 명은 기본 복수형으로 만들어짐(member -> members)
   * primaryKey: false, 입력하지 않을 시, 기본 값
   *
   */
  return sequelize.define(
    'member',
    {
      member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '회원고유번호',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '사용자메일주소',
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '사용자 암호',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      /**
       * timestamps: 등록일시, 수정일시 자동생성 craetedAt, updatedAt
       * paranoid 데이터 삭제 컬럼 자동 생성 및 물리적 데이터 삭제 안함 기능 제공 deletedAt
       */
    }
  );
};
