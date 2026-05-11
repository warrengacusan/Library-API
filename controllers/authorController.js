const Author = require('../models/Authors');
//Get all records
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Create records
exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get one record
exports.getAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found." });
        }

        res.json(author);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update record
exports.updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Author.update(req.body, { where: { id } });

        if (!updated) {
            return res.status(404).json({ message: 'Author not found'});
        }

        res.json({ message: 'Author updated' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete record
exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Author.destroy({ where: { id } });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Author not found'});
        }

        res.json({ message: 'Author deleted' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
