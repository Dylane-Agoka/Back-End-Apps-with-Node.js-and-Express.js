const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secretKey = 'secret-key';

// POST endpoint for user login and JWT generation
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulated authentifcation 
  if (username === 'user' && password === 'password') {
    // Generate JWT with username payload
    const token = jwt.sign({username}, secretKey, { expiresIn: '1h'});
    res.status(200).json({token});
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// GET endpoint to access protected resource (dashboard)
app.get('/dashboard', (req, res) => {
  // Get token from Authorization header
  const token = req.headers['authorization'];
  if (token) {
    // Verify JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(400).send('Invalid token');
      } else {
        // Token is valid, send welcomme message with username
        res.status(200).send(`Welcome ${decoded.username}`);
      }
    });
  } else {
    res.status(400).send('Token missing');
  }
});

// Start server
app.listen(3000, () => console.log('server running on port 3000'));