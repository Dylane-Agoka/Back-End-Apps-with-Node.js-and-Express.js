const express = require('express');
const router = express.Router();

let friends = {
  "johnsmith@gamil.com": { "firstName": "John", "lastName": "Doe", "DOB": "22-12-1990" },
  "annasmith@gamil.com": { "firstName": "Anna", "lastName": "smith", "DOB": "02-07-1983" },
  "peterjones@gamil.com": { "firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989" }
};

/**
 * Retrieve all friends
 * @returns {Object | {}} - full list of friends or empty object
 */
router.get("/", (req, res) => {
  // res.send(JSON.stringify(friends,null,4));
  res.status(200).send(friends);
});

/**
 * Retrieves a friend's object using their email address
 * @param {string} email - The email address (which is the key in the friends object)
 * @returns {Object | string} - The friend object if found, otherwise a "Friend not found" message
 */
router.get("/:email", (req, res) => {
  const email = req.params.email;
  const friend = friends[email];
  if (friend) {
    return res.status(200).send(friend);
  } else {
    return res.status(404).json({ message: 'Friend not found' });
  }
});

/**
 * Adds a new friend
 * @body {string} email - The friend's email (unique key)
 * @body {string} firstName - First name
 * @body {string} lastName - Last name
 * @body {string} DOB - Date of birth
 * @returns {Object} - Confirmation message + created friend or email already exists or invalid data
 */
router.post("/", (req, res) => {
  const { email, firstName, lastName, DOB } = req.body;
  if (!email || !firstName || !lastName || !DOB) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (friends[email]) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  // friends[email] = { firstName, lastName, DOB };
  friends[email] = {
    "firstName": firstName,
    "lastName": lastName,
    "DOB": DOB
  };
  // res.send("The user" + (' ') + (firstName) + " Has been added!");
  res.status(201).json({
    message: "Friend successfully added",
    friend: friends[email]
  });
});


/**
 * Update a friend
 * @body {string} email - The friend's email to update
 * @body {string} [firstName] - Optional updated First name
 * @body {string} [lastName] - Optional updated Last name
 * @body {string} [DOB] - Optional updated Date of birth
 * @returns {Object} - Updated friend object or friend not found
 */
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    const { firstName, lastName, DOB } = req.body;
    if (firstName) {
      friend['firstName'] = firstName;
    }
    if (lastName) {
      friend['lastName'] = lastName;
    }
    if (DOB) {
      friend['DOB'] = DOB;
    }
    friends[email] = friend;
    res.status(200).json({
      message: `Friend with the email ${email} updated.`,
      friend: friend
    });
  } else {
    res.status(404).json({ message: 'Unable to find friend!' });
  }
});


/**
 * Removes a friend based on their email
 * @param {string} email - The friend's email
 * @returns {Object} - success message or friend not found!
 */
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  const friend = friends[email];
  if (!friend) {
    res.status(404).json({ message: 'Friend not found!' });
  }
  delete friends[email];
  res.status(200).json({ message: `Friend with the email ${email} deleted.`});
});

module.exports = router;
