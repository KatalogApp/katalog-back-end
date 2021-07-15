const createError = require('http-errors');

const checkIfLoggedIn = (req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		next(createError(401));
	}
};

const checknameAndPasswordNotEmpty = (req, res, next) => {
	const { name, password } = req.body;

	if (name !== '' && password !== '') {
		res.locals.auth = req.body;
		next();
	} else {
		next(createError(422));
	}
};

module.exports = {
	checkIfLoggedIn,
	checknameAndPasswordNotEmpty,
};
