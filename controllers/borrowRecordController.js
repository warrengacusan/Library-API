const Book = require('../models/Books')
const BorrowRecord = require('../models/BorrowRecords')
const Member = require('../models/Members');

exports.borrowBook = async (req, res) => {
    try {
        const { bookId, memberId } = req.body
        const book = await Book.findByPk(bookId);
        const member = await Member.findByPk(memberId);
        
        if (!member || !book) {
            return res.status(404).json({ message: 'Member or Book not found'});
        }

        if (!book.availabilityStatus){
            return res.status(400).json({ message: 'Book already borrowed'});
        }

        book.availabilityStatus = false;
        await book.save();
        member.booksBorrowed += 1;
        await member.save();

        await BorrowRecord.create({ bookId, memberId, borrowDate: new Date()});

        res.json({ message: 'Borrowed a book successfully'})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { bookId, memberId } = req.body
        const book = await Book.findByPk(bookId);
        const member = await Member.findByPk(memberId);
        
        if (!member || !book) {
            return res.status(404).json({ message: 'Member or Book not found'});
        }

        if (book.availabilityStatus){
            return res.status(400).json({ message: 'Book already returned'});
        }

        const record = await BorrowRecord.findOne({
            where: { bookId, memberId, returnDate: null}
        });

        if (!record) {
            return res.status(404).json({ message: 'Book record not found'})
        }

        book.availabilityStatus = true;
        await book.save();
        member.booksBorrowed -= 1;
        await member.save();
        record.returnDate = new Date();
        await record.save();
        
        res.json({ message: 'Returned a book successfully'})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getActiveBorrowRecords = async (req, res) => {
    try {
        const records = await BorrowRecord.findAll({
            where: { returnDate: null }
        });

        res.json(records);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBorrowRecords = async (req, res) => {
    try {   
        const allrecords = await BorrowRecord.findAll();

        res.json(allrecords);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMemberBorrowRecords = async (req, res) => {
    try {
        const { memberId } = req.params;
        const memberrecords = await BorrowRecord.findAll({ where: { memberId } });
        res.json(memberrecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookBorrowRecords = async (req, res) => {
    try {
    const { bookId } = req.params;
    const bookrecords = await BorrowRecord.findAll({ where: { bookId } });
    res.json(bookrecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

