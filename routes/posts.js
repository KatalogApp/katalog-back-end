// const mongoose = require('mongoose');
const { Router } = require('express');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
// const Note = require('../models/Note.js');
const router = new Router();
// const bcryptjs = require('bcryptjs');
// const saltRounds = 10;
// const salt = bcryptjs.genSaltSync(saltRounds);
// eslint-disable-next-line import/no-unresolved
const fileUploader = require('../configs/cloudinary.config');

// RENDER CREATE A POST PAGE
router.get('/user-profile/create', (req, res) => {
	res.status(200).json({ create: 'a post here' });
	//console.log("hello")
});

// CREATE NEW POST
router.post('/user-profile/create', fileUploader.single('image'), (req, res) => {
	const { title, date, description, keywords, theme, creator } = req.body;
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	const file = req.file.path;
	const newPost = Post.create({ userId, title, date, description, keywords, theme, creator, imageUrl: file })
		.then(dbPost => {
			// eslint-disable-next-line no-underscore-dangle
			return User.findByIdAndUpdate(userId, { $push: { posts: dbPost._id } });
		})
		// eslint-disable-next-line no-undef
		.then(() => res.post(newPost))
		// eslint-disable-next-line no-console
		.catch(error => console.log(`Error while creating a new post:`, error));
});

// GET update post
router.get('/user-profile/:id/edit', (req, res, next) => {
	// const postId = req.session.currentUser.posts[0]._id;
	const postId = req.params.id;
	Post.findById(postId)
		.then(postToEdit => {
			// eslint-disable-next-line no-console
			console.log(postToEdit);
			return res.render('edit-post', { post: postToEdit });
		})
		.catch(error => next(error));
});

// POST update post
router.post('/user-profile/:id/edit', (req, res, next) => {
	// const postId = req.session.currentUser.posts._id;
	const postId = req.params.id;
	const { title, description, theme } = req.body;

	Post.findByIdAndUpdate(postId, { title, description, theme }, { new: true })
		.then(() => res.redirect('/user-profile'))
		.catch(error => next(error));
});

// Delete post

router.post('/user-profile/:id/delete', (req, res) => {
	const postId = req.params.id;

	Post.findByIdAndDelete(postId)
		.then(() => res.redirect('/user-profile'))
		// eslint-disable-next-line no-undef
		.catch(error => next(error));
});

module.exports = router;
