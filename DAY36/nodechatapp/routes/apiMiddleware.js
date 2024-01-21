const jwt = require('jsonwebtoken');

exports.tokenAuthChecking = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    var apiResult = {
      code: 400,
      data: null,
      msg: '사용자 인증토큰이 제공되지 않았습니다.',
    };

    return res.json(apiResult);
  }
  try {
    var token = req.headers.authorization.split('Bearer ')[1];
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

    if (tokenJsonData != null) {
      next();
    }
  } catch (err) {
    var apiResult = {
      code: 400,
      data: null,
      msg: '유효하지 않은 사용자 인증토큰입니다.',
    };
    return res.json(apiResult);
  }
};
