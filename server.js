const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const destinations = require('./destinations');
const app = express();
const port = 3000;

const adminCredentials = {
    username: 'admin',
    password: 'adminpassword',
  };

const secretKey = '$&Jk2P!qLz8s*%t9WuYx2Zb5Ee3A#v7F';

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(__dirname, { 'Content-Type': 'application/javascript' }));


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log('Received Token:', token);
    if (token) {
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Token Verification Error:', err);
          return res.status(403).json({ message: 'Forbidden' }); 
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'login.html');
    console.log('File Path:', filePath);
    res.sendFile(filePath);
});
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const token = jwt.sign({ username: adminCredentials.username }, secretKey);
      console.log('Generated Token:', token)
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  console.log('Fetching all destinations');
app.get('/destinations', authenticateJWT, (req, res) => {
    const _page = parseInt(req.query._page) || 1;
    const _limit = parseInt(req.query._limit) || 10;

    if (_page && _limit) {
        const startIndex = (_page - 1) * _limit;
        const endIndex = startIndex + _limit;
        const paginatedDestinations = destinations.slice(startIndex, endIndex);
        res.json(paginatedDestinations);
    } else {
        console.log('Fetching all destinations');
        res.json(destinations);
    }
});

app.get('/destinations/:id',authenticateJWT, (req, res) => {
    const destinationId = parseInt(req.params.id);
    const destination = destinations.find(d => d.id === destinationId);

    if (destination) {
        res.json(destination);
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});

app.post('/destinations', authenticateJWT,(req, res) => {
    const newDestination = req.body;
    newDestination.id = destinations.length + 1;
    destinations.push(newDestination);
    res.json(newDestination);
});

app.put('/destinations/:id', authenticateJWT,(req, res) => {
    const destinationId = parseInt(req.params.id);
    const updatedDestination = req.body;

    destinations = destinations.map(d => (d.id === destinationId ? updatedDestination : d));

    res.json(updatedDestination);
});

app.delete('/destinations/:id', authenticateJWT,(req, res) => {
    const destinationId = parseInt(req.params.id);

    destinations = destinations.filter(d => d.id !== destinationId);

    res.json({ message: 'Destination deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
