const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterService = require('./services/characterService');
const characterController = require('./controllers/characterController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize character data
characterService.initializeCharacterData();

// Routes
app.get('/api/character/:filename', characterController.getCharacter);
app.post('/api/character/:filename/damage', characterController.dealDamage);
app.post('/api/character/:filename/heal', characterController.heal);
app.post('/api/character/:filename/temp-hp', characterController.addTemporaryHp);

app.listen(port, () => {
  console.log(`D&D Character HP Management API running on port ${port}`);
});