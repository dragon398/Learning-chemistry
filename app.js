// Ing-Angsara Thongchai, ant324 

const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const fsPromises = require('fs').promises;

let elementList = []; // Array to store paired elements

// Use fsPromises.readFile() method
// to read the file
fs.promises.readFile('./periodic.txt')
  .then(buffer => {
    const data = buffer.toString('utf8'); // Convert the data from buffer to string 
    const rows = data.split('\n'); // Split the data into rows
    
    // Iterate over each row
    rows.forEach(row => {
      const columns = row.trim().split(/\s+/); // Split the row into columns
      if (columns.length >= 3) { // Ensure there are at least three columns
        // Extract data from the second and third columns
        const symbol = columns[1];
        const name = columns[2];
        // Push the pair into the elementList array
        elementList.push({ symbol, name });
      }
    });

    console.log('Element list loaded:', elementList.length, 'elements');
  })
  .catch(err => {
    console.error('Error reading periodic.txt:', err);
  });

// Router to return the element pairs to clients
app.get('/elements', (req, res) => {
  if (!elementList || elementList.length === 0) {
    return res.status(500).send('Elements are not loaded');
  }
  // Send the element list as JSON to the client
  res.json(elementList);
});

app.use(express.static(
  path.resolve(__dirname, "public")
));

app.listen(3000, () => console.log("Let's guess the term symbol"));


