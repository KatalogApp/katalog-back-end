const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
