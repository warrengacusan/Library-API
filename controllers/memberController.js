const Member = require('../models/Members');
//Get all records
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Create records
exports.createMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get one record
exports.getMember = async (req, res) => {
    try {
        const { id } = req.params
        const member = await Member.findByPk(id);

        if (!member) {
            return res.status(404).json({ message: "Member not found." });
        }

        res.json(member);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update record
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Member.update(req.body, { where: { id } });

        if (!updated) {
            return res.status(404).json({ message: 'Member not found'});
        }

        res.json({ message: 'Member updated' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete record
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Member.destroy({ where: { id } });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Member not found'});
        }

        res.json({ message: 'Member deleted' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
