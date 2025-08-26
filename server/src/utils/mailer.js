const nodemailer = require('nodemailer');

function createTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP config missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
  }

  const port = Number(SMTP_PORT) || 587;
  const secure = String(SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendMail({ to, subject, text, html, from, replyTo }) {
  const transporter = createTransporter();
  const mailFromAddress = from || process.env.FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.FROM_NAME || 'Pankaj Portfolio';
  const formattedFrom = /</.test(String(mailFromAddress)) ? mailFromAddress : `${fromName} <${mailFromAddress}>`;
  const info = await transporter.sendMail({ from: formattedFrom, to, subject, text, html, replyTo });
  return info;
}

module.exports = { sendMail };
