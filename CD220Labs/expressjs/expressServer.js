const express = require('express');

const app = new express();

let loginDetails = [];

app.get("/", (req, res) => {
  res.send("Welcome to the express server");
});

app.get("/login-details", (req, res) => {
  res.send(JSON.stringify(loginDetails));
});

// Define a route to handle login requests and store login details
app.post("/login/:name", (req, res) => {
  loginDetails.push({ "name": req.params.name, "login_time": new Date() });
  res.send(req.params.name + ", You are logged in!");
});

// Define a dynamic route to greet users by name
app.get("/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

// Define an array containing the names of the months
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'];

app.get('/months/:num', (req, res) => {
  let num = parseInt(req.params.num);
  if (num < 1 || num > 12) {
    res.status(401).send('Not a valid month number');
  } else {
    res.send(months[num - 1]);
  }
});

// Start the server and listen on port 3333
app.listen(3333, () => {
  console.log(`Listening at http://localhost:3333`);
});
