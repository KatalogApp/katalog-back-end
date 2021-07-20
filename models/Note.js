const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'description is required'],
		},
		content: {
			type: String,
			required: [true, 'description is required'],
		},
		posts:[{ 
			type: Schema.Types.ObjectId, 
			ref: 'Post' 
		}],
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
