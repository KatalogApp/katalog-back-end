/* eslint-disable no-console */

const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = new Router();

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
	// router.post('/user-profile/post/create', fileUploader.single('image'), async (req, res) => {
		const { title, description, keywords, theme, imageUrl } = req.body;
		// const file = req.file.path;
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	// const file = req.file.path;
	try {
		const newPost = await Post.create({ userId, title, description, keywords, theme, imageUrl, creator: userId });
		const currentUser = await User.findById(userId);
		// eslint-disable-next-line no-underscore-dangle
		currentUser.posts.push(newPost._id);
		await currentUser.save();
	} catch (error) {
		console.log(error);
	} finally {
		console.log("post created")
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
	const userId = req.session.currentUser._id;
	try {
		const deletedPost = await Post.findByIdAndDelete(postId);
		const currentUser = await User.findById(userId);
		const postIndex = currentUser.posts.indexOf(postId);
		currentUser.posts.splice(postIndex, 1);
		currentUser.save();
		req.session.currentUser = currentUser;
		res.status(200).json(deletedPost);
	} catch (error) {
		console.log(error, 'error occurred when deleting post');
	}
});

module.exports = router;

