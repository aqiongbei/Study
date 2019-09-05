var mongoose = require('mongoose');
var url = "mongodb://127.0.0.1/books";
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(url);
mongoose.Promise = Promise;
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});
var BooksSchema = new mongoose.Schema({
    bookName: String,
    bookCover: String,
    bookPrice: String,
    bookCate: String,
    bookAuthor: String,
    user: {
        type: ObjectId,
        ref: 'User'
    }
});
exports.User = mongoose.model('User', UserSchema);
exports.Books = mongoose.model('Books', BooksSchema);
