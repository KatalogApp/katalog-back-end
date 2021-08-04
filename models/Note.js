const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
	title: {
		type: String,
		required: [true, 'description is required'],
	},
	content: {
		type: String,
		required: [true, 'description is required'],
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
