const db = require("../models/index");

exports.loginUserCheckMiddleware = async (userId, userPassword) => {
	let loginUserCheck = false;

	loginUserCheck = await db.Member.findOne({where: {email: userId, member_password: userPassword}});

	if (loginUserCheck) {
		next();
	} else {
		res.status(403).send("회원 가입이 필요합니다.");
	}
};
