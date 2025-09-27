require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email server not configured' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    // Verify SMTP configuration before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}\n\n(Note: This email is not verified)`,
      html: `<p><b>From:</b> ${name} (${email})</p>
             <p><b>Subject:</b> ${subject}</p>
             <p>${message}</p>
             <hr>
             <p style="color:#888;font-size:13px;">Note: This email is not verified. Anyone can enter any email in the contact form.</p>`
    });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    if (err.stack) {
      console.error('Error stack:', err.stack);
    }
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
