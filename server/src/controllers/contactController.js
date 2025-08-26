const Message = require('../models/Message');
const { sendMail } = require('../utils/mailer');

// POST /api/contact
async function submitContact(req, res) {
  try {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !body) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const msg = await Message.create({ name, email, subject, body });
    // Fire-and-forget emails (do not block success response)
    (async () => {
      try {
        // Confirmation email to user
        const userSubject = 'Congratulations! Your form was submitted successfully';
        const userText = `Hi ${name},\n\nCongratulations! Your contact form has been submitted successfully.\nWe received your details and will get back to you soon.\n\nSummary:\n- Subject: ${subject || '(no subject)'}\n- Message: ${body}\n\nThank you!`;
        const userHtml = `
          <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#222">
            <p>Hi ${name},</p>
            <p><strong>Congratulations!</strong> Your contact form has been submitted successfully.</p>
            <p>We received your details and will get back to you soon.</p>
            <p><strong>Summary</strong><br/>
              Subject: ${subject || '(no subject)'}<br/>
              Message: ${body?.replace(/</g,'&lt;')}
            </p>
            <p>Thank you!</p>
          </div>`;
        await sendMail({ to: email, subject: userSubject, text: userText, html: userHtml });

        // Notification email to owner
        const owner = process.env.OWNER_EMAIL;
        if (owner) {
          const ownerSubject = 'New contact form submission';
          const ownerText = `New message from portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || '(no subject)'}\nMessage:\n${body}\n\nMessageId: ${String(msg._id)}`;
          await sendMail({ to: owner, subject: ownerSubject, text: ownerText, replyTo: email });
        }
      } catch (e) {
        console.error('sendMail error (non-blocking):', e?.message || e);
      }
    })();

    res.status(201).json({ ok: true, id: msg._id });
  } catch (err) {
    console.error('submitContact error', err);
    res.status(500).json({ error: 'Failed to submit message' });
  }
}

module.exports = { submitContact };
