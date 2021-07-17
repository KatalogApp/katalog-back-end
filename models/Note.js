const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema(
	{
		content: {
			type: String,
			required: [true, 'description is required'],
		},
		date: {
		type: Date,
		default: Date.now(),
	},
	
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
