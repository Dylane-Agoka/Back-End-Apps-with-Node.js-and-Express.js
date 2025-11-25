// Requiring prompt-sync module to enable synchronous user input
let prompt = require('prompt-sync')();

// Requiring fs module - fs is used for File I/O
let fs = require('fs');

const methCall = new Promise((resolve, reject) => {
    let filename = prompt('What is the name of the file?');
    try {
        const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
        resolve(data);
    } catch (err) {
        reject(err);
    }
});

console.log(methCall);

// Handling the resolved and rejected states of the promise
methCall.then(
    (data) => console.log(data),
    (err) => console.log("Error reading file")
);
