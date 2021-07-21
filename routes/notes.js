const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Note = require('../models/Note');

const router = new Router();


// CREATE NEW POST

router.post('/user-profile/note/create', async (req, res) => {
	// router.post('/user-profile/create', fileUploader.single('image'), async (req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	const userId = req.session.currentUser._id;
	// const file = req.file.path;
	try {
		const newNote = await Note.create(req.body);
		const currentUser = await User.findById(userId);
		// eslint-disable-next-line no-underscore-dangle
    currentUser.notes.push(newNote._id);
		await currentUser.save();
	} catch (error) {
		console.log(error);
	} finally {
		const updatedUser = await User.findById(userId).populate({ path: 'notes', model: Note });
		req.session.currentUser = updatedUser;
		res.status(201).json({ user: updatedUser });
	}
});

// POST update post

router.post('/user-profile/:id/edit', async (req, res) => {
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

router.delete('/user-profile/:id/delete', async (req, res) => {
	const postId = req.params.id;
	try {
		const deletedPost = await Post.findByIdAndDelete(postId);
		res.status(200).json(deletedPost);
	} catch (error) {
		console.log(error, 'error occurred when deleting post');
	}
});


module.exports = router;