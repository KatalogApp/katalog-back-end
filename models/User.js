const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'name is required.'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		hashedPassword: {
			type: String,
			required: [true, 'Password is required.'],
		},
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
