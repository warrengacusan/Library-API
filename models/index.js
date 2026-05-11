const Author = require('./Authors');
const Book = require('./Books');
const Member = require('./Members');
const BorrowRecord = require('./BorrowRecords');

Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author'});
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books'});
BorrowRecord.belongsTo(Book, { foreignKey: 'bookId', as: 'book'});
Book.hasMany(BorrowRecord, { foreignKey: 'bookId', as: 'borrowRecords'});
BorrowRecord.belongsTo(Member, { foreignKey: 'memberId', as: 'member'});
Member.hasMany(BorrowRecord, { foreignKey: 'memberId', as: 'borrowRecords'});

module.exports = { Author, Book, Member, BorrowRecord };