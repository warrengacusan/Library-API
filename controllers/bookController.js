const Book = require('../models/Books');
//Get all records
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Create records
exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get one record
exports.getBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.json(book);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update record
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Book.update(req.body, { where: { id } });

        if (!updated) {
            return res.status(404).json({ message: 'Book not found'});
        }

        res.json({ message: 'Book updated' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete record
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({ where: { id } });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found'});
        }

        res.json({ message: 'Book deleted' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
