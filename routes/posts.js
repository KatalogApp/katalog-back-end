/* eslint-disable no-console */
// const mongoose = require('mongoose');
const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
// const Note = require('../models/Note.js');
const router = new Router();
// const bcryptjs = require('bcryptjs');
// const saltRounds = 10;
// const salt = bcryptjs.genSaltSync(saltRounds);
// eslint-disable-next-line import/no-unresolved
// const fileUploader = require('../configs/cloudinary.config');

// RENDER CREATE A POST PAGE
// YOU DON'T NEED THIS ONE
router.get('/user-profile/create', (req, res) => {
	res.status(200).json({ create: 'a post here' });
	//console.log("hello")
});

// CREATE NEW POST
router.post('/user-profile/create', async (req, res) => {
// router.post('/user-profile/create', fileUploader.single('image'), async (req, res) => {
	const { title, date, description, keywords, theme, creator } = req.body;
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	// const file = req.file.path;
	try {
		const newPost = await Post.create({ userId, title, date, description, keywords, theme, creator });
		const currentUser = await User.findById(userId);
		// eslint-disable-next-line no-underscore-dangle
		currentUser.posts.push(newPost._id);
		currentUser.save();
	} catch (error) {
		console.log(error);
	} finally {
		const updatedUser = await User.findById(userId).populate({ path: 'posts', model: Post });
		req.session.currentUser = updatedUser;
		res.status(200).json({ user: updatedUser });
	}
});

// GET update post
// YOU DON'T NEED THIS
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
router.post('/user-profile/:id/edit', async (req, res, next) => {
	// const postId = req.session.currentUser.posts._id;
	const postId = req.params.id;
	const { title, description, theme } = req.body;
	try {
		const newPost = await Post.findByIdAndUpdate(postId, { title, description, theme }, { new: true });
		if (!newPost) {
			console.log('No post created');
		}
		res.status(201).json(newPost);
	} catch (error) {
		console.log(error);
	}
});

// Delete post

router.post('/user-profile/:id/delete', (req, res) => {
	const postId = req.params.id;
	Post.findByIdAndDelete(postId)
	// QUITAR REDIRECT
		.then(() => res.redirect('/user-profile'))
		// eslint-disable-next-line no-undef
		.catch(error => next(error));
});

module.exports = router;
