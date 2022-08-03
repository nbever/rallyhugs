const mongoose = require('mongoose');

const basicSchemaType = {
  name: String,
  icon: String,
  color: String
};

const tagSchema = new mongoose.Schema({
  ...basicSchemaType
});

const customerSchema = new mongoose.Schema({
  ...basicSchemaType
});

const userSchema = new mongoose.Schema({
  ...basicSchemaType
});

const commentSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  user: mongoose.ObjectId,
  userName: String,
  customer: mongoose.ObjectId,
  customerName: String,
  positive: Number,
  tags: [String],
  comment: String
});

const Tag = mongoose.model('Tag', tagSchema);
const Customer = mongoose.model('Customer', customerSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Tag, Customer, User, Comment
};