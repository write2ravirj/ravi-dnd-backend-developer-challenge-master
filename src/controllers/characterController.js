const characterService = require('../services/characterService');

const characterController = {
  getCharacter: (req, res) => {
    try {
      const { name } = req.params;
      const character = characterService.getCharacter(name);
      res.json(character);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  dealDamage: (req, res) => {
    try {
      const { name } = req.params;
      const { damageAmount, damageType } = req.body;
      
      if (!damageAmount || !damageType) {
        return res.status(400).json({ error: 'Damage amount and type are required' });
      }

      const result = characterService.dealDamage(name, damageAmount, damageType);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  heal: (req, res) => {
    try {
      const { name } = req.params;
      const { amount } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: 'Healing amount is required' });
      }

      const result = characterService.heal(name, amount);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addTemporaryHp: (req, res) => {
    try {
      const { name } = req.params;
      const { amount } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: 'Temporary HP amount is required' });
      }

      const result = characterService.addTemporaryHp(name, amount);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = characterController;