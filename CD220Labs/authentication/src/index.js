const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());

// Middleware to set up session management
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Post endpoint for handling login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Missing fields');
  }
  if (username !== 'user' || password !== 'password') {
    return res.status(401).send('Invalid credentials');
  }
  req.session.user = username;
  res.send('Logged in successfully');
});

// Get endpoint for accessing dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user}`);
  } else {
    res.send('Please log in first');
  }
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));