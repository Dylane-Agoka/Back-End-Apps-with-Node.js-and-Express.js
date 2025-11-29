const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // res.send(users);
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const {email} = req.params;
  if (email === null) {
    res.status(400).send('Email required');
  }
  const user = users.filter(user => user.email === email);
  console.log(user);
  if (user.length === 0) {
    res.status(404).send(`User with ${email} not found!`);
  }
  res.send(user);
});

router.get("/lastName/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    let filtered_lastname = users.filter((user) => user.lastName === lastName);
    res.send(filtered_lastname);
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    res.send(sorted_users);
});


// POST request: Create a new user
router.post("/version1",(req,res)=>{
  const {firstName, lastName, email, DOB} = req.body;
  if (!firstName || !lastName || !email || !DOB) {
    res.status(400).send('Missing field');
  }
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    DOB: DOB
  };
  users.push(user);
  res.status(201).send(user);
});

router.post("/",(req,res)=>{
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtredUsers = users.filter((user) => user.email === email);
  if (filtredUsers.length > 0) {
    let filtredUser = filtredUsers[0];
    let DOB = req.query.DOB;
    if (DOB) {filtredUser.DOB = DOB;}
    let firstName = req.query.firstName;
    if (firstName) {filtredUser.firstName = firstName;} 
    let lastName = req.query.lastName;
    if (lastName) {filtredUser.lastName = lastName;}

    users = users.filter((user) => user.email != email);
    users.push(filtredUser);
    
    res.send(`User with the email ${email} updated.`);
  } else {
    res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
