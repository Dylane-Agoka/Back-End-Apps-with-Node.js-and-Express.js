const axios = require('axios').default;

// Sending a GET request to the specified URL using axios
const req = axios.get("https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/courseDetails.json");

console.log(req);
// Handling the promise resolution
req.then(resp => {
    let courseDetails = resp.data;
    console.log(JSON.stringify(courseDetails, null, 4));
})
// Handling the promise rejection
.catch(err => {
    console.log(err.toString());
    // This will console log the error with the code. e.g., Error: Request failed with status code 404
});
