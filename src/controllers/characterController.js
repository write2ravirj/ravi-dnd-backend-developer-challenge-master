const characterService = require('../services/characterService');

const characterController = {
  getCharacter: (req, res) => {
    try {
      const { filename } = req.params;
      const character = characterService.getCharacter(filename);
      res.json(character);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  dealDamage: (req, res) => {
    try {
      const { filename } = req.params;
      const { damageAmount, damageType } = req.body;
      
      if (!damageAmount || !damageType) {
        return res.status(400).json({ error: 'Damage amount and type are required' });
      }

      const result = characterService.dealDamage(filename, damageAmount, damageType);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  heal: (req, res) => {
    try {
      const { filename } = req.params;
      const { amount } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: 'Healing amount is required' });
      }

      const result = characterService.heal(filename, amount);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addTemporaryHp: (req, res) => {
    try {
      const { filename } = req.params;
      const { amount } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: 'Temporary HP amount is required' });
      }

      const result = characterService.addTemporaryHp(filename, amount);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = characterController;