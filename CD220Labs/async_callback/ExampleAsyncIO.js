let fs = require('fs');

let filename1 = "courseDetails.json";
let filename2 = "sampleData.json";

// Reading the file Asynchronously - Not blocking rest of execution
function readFile1(filename1) {
    // Using fs.readFile to read the file asynchronously
    fs.readFile(filename1, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // Logging the content of the file if read successfully
            console.log("\n\nThe content of the file is \n\n" + data);
            console.log("Completed reading file1");
        }
    });
}

function readFile2(filename2) {
    // Using fs.readFile to read the file asynchronously
    fs.readFile(filename2, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // Logging the content of the file if read successfully
            console.log("\n\nThe content of the file is \n\n" + data);
            console.log("Completed reading file2");
        }
    });
}

console.log('Before reading the file-1');
readFile1(filename1);

console.log('Before reading the file-2');
readFile2(filename2);

console.log('All done!');
