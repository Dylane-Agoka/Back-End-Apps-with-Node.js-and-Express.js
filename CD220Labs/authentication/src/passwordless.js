const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const users = {}; // In-memory storage for demo purposes

// Endpoint to request access and send verification code via email
app.post('/request-access', (req, res) => {
  const {email} = req.body;
  // Generate a 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // Store the code in memory (users object)
  users[email] = code;
  // Simulated email sending (for demonstration)
  console.log(`Sending code ${code} to ${email}`);
  res.send('Code sent to your email');
});

// Endpoint to verify the received code
app.post('/verify-code', (req, res) => {
  const {email, code} = req.body;
  // Compare the received code with stored code for the email
  if (users[email] === code) {
    // Code matches, access granted
    res.status(200).send('Access granted');
  } else {
    // Code does not match, access denied
    res.status(401).send('Invalid code');
  }
});

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000'));