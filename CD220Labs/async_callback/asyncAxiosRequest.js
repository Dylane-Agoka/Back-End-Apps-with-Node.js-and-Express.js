const axios = require('axios').default;

const connectToURL = (url) => {
    const req = axios.get(url);
    console.log(req);
    // Handling the promise resolution
    req.then(resp => {
        // Logging the fulfillment message
        console.log("Fulfilled");
        // Logging the response data
        console.log(resp.data);
    })
    // Handling the promise rejection
    .catch(err => {
        // Logging the rejection message with the URL
        console.log("Rejected for url " + url);
        // Logging the error message
        console.log(err.toString());
    });
}

// Valid URL
connectToURL('https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/sampleData.json');
// Invalid URL
connectToURL('https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/sampleDate.json');
