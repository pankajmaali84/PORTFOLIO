const Message = require('../models/Message');

// POST /api/contact
async function submitContact(req, res) {
  try {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !body) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const msg = await Message.create({ name, email, subject, body });
    res.status(201).json({ ok: true, id: msg._id });
  } catch (err) {
    console.error('submitContact error', err);
    res.status(500).json({ error: 'Failed to submit message' });
  }
}

module.exports = { submitContact };
