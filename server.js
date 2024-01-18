// index.js
const express = require('express');
const bodyParser = require('body-parser');
const destinations = require('./destinations');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send(`Hello, Welcome to Globe....`);
})

app.get('/destinations', (req, res) => {
  res.json(destinations);
});

app.get('/destinations/:id', (req, res) => {
  const destinationId = parseInt(req.params.id);
  const destination = destinations.find(d => d.id === destinationId);

  if (destination) {
    res.json(destination);
  } else {
    res.status(404).json({ message: 'Destination not found' });
  }
});


app.post('/destinations', (req, res) => {
  const newDestination = req.body;
  newDestination.id = destinations.length + 1;
  destinations.push(newDestination);
  res.json(newDestination);
});


app.put('/destinations/:id', (req, res) => {
  const destinationId = parseInt(req.params.id);
  const updatedDestination = req.body;

  destinations = destinations.map(d => (d.id === destinationId ? updatedDestination : d));

  res.json(updatedDestination);
});


app.delete('/destinations/:id', (req, res) => {
  const destinationId = parseInt(req.params.id);

  destinations = destinations.filter(d => d.id !== destinationId);

  res.json({ message: 'Destination deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

