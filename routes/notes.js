const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Note = require('../models/Note');

const router = new Router();


// Create New Note

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

// POST update Note

router.post('/user-profile/note/:id/edit', async (req, res) => {
	// const postId = req.session.currentUser.posts._id;
	const noteId = req.params.id;
	const { title,content } = req.body;
	try {
		const newNote = await Note.findByIdAndUpdate(
			noteId,
			{ title, content },
			{ new: true }
		);
		if (!newNote) {
			console.log('No post created' + noteId);
		}
		res.status(200).json(newNote);
	} catch (error) {
		console.log(error);
	}
});

// Delete Note

router.delete('/user-profile/note/:id/delete', async (req, res) => {
	const noteId = req.params.id;
	try {
		const deletedNote = await Note.findByIdAndDelete(noteId);
		res.status(200).json(deletedNote);
	} catch (error) {
		console.log(error, 'error occurred when deleting post');
	}
});


module.exports = router;