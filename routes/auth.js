const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const { checknameAndPasswordNotEmpty } = require('../middlewares');

const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

router.get('/user-profile', (req, res, next) => {
	if (req.session.currentUser) {
		res.status(200).json(req.session.currentUser);
	} else {
		next(createError(401));
	}
});

//signup
router.post('/signup', checknameAndPasswordNotEmpty, async (req, res, next) => {
	const { name, email, password } = res.locals.auth;
	try {
		const user = await User.findOne({ email });
		if (user) {
			return next(createError(422));
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({ name, email, hashedPassword });
		req.session.currentUser = newUser;
		return res.json(newUser);
	} catch (error) {
		return next(error);
	}
});

//login
router.post('/login', checknameAndPasswordNotEmpty, async (req, res, next) => {
	const { email, password } = res.locals.auth;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(createError(404));
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			return res.json(user);
		}
		return next(createError(404));
	} catch (error) {
		return next(error);
	}
});


//update
router.post('/user-profile/edit', async (req, res) => {
	
	const userId = req.session.currentUser._id;
  const { name, email } = req.body;
	try {
		const newUser = await User.findByIdAndUpdate(
			userId, 
			{ name, email }, 
			{ new: true }
			);

		if (!newUser) {
			console.log('No user updated');
		}
		res.status(200).json(newUser);
	} catch (error) {
		console.log(error);
	}
});


//logout
router.post('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}

		return res.status(204).send();
	});
});


//delete 
router.delete('/user-profile/delete', async (req, res) => {
  const userId = req.session.currentUser._id; 
	try {
	const deletedUser = await  User.findByIdAndDelete(userId);
	req.session.destroy();
    res.status(200).json(deletedUser);
		} catch (error) {
		console.log(error, 'error occurred when deleting user');
	}
});
module.exports = router;
