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

// GET POSTS
router.get('/user-profile/posts', async (req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	if (!req.session.currentUser) {
		res.status(401).json({ status: 'No user logged in' });
	}
	const user = await User.findById(userId).populate('posts');
	res.status(200).json(user);
});

// GET SINGLE POST
router.get('/user-profile/posts/:id', async (req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	const postId = req.params.id;
	const post = await Post.findById(postId);
	if (!post) {
		res.status(404).json({ status: 'No post found' });
	}
	res.status(200).json(post);
});

// CREATE NEW POST
router.post('/user-profile/post/create', async (req, res) => {
	// router.post('/user-profile/create', fileUploader.single('image'), async (req, res) => {
	const { title, description, keywords, theme } = req.body;
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	try {
		const newPost = await Post.create({ userId, title, description, keywords, theme, creator: userId });
		const currentUser = await User.findById(userId);
		// eslint-disable-next-line no-underscore-dangle
		currentUser.posts.push(newPost._id);
		await currentUser.save();
	} catch (error) {
		console.log(error);
	} finally {
		const updatedUser = await User.findById(userId).populate({ path: 'posts', model: Post });
		req.session.currentUser = updatedUser;
		res.status(201).json({ user: updatedUser });
	}
});

// POST update post

router.post('/user-profile/post/:id/edit', async (req, res) => {
	// const postId = req.session.currentUser.posts._id;
	const postId = req.params.id;
	const { title, date, description, keywords, theme, creator } = req.body;
	try {
		const newPost = await Post.findByIdAndUpdate(
			postId,
			{ title, date, description, keywords, theme, creator },
			{ new: true }
		);
		if (!newPost) {
			console.log('No post created');
		}
		res.status(200).json(newPost);
	} catch (error) {
		console.log(error);
	}
});

// Delete post

router.delete('/user-profile/post/:id/delete', async (req, res) => {
	const postId = req.params.id;
	try {
		const deletedPost = await Post.findByIdAndDelete(postId);
		res.status(200).json(deletedPost);
	} catch (error) {
		console.log(error, 'error occurred when deleting post');
	}
});


module.exports = router;
