const fs = require('fs');
const path = require('path');

let characters = new Map();

const characterService = {
  initializeCharacterData: () => {
    try {
      const brivData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../briv.json'), 'utf8'));
      characters.set('briv.json', {
        ...brivData,
        currentHp: brivData.hitPoints,
        temporaryHp: 0
      });
    } catch (error) {
      console.error('Error initializing character data:', error);
      throw new Error('Failed to initialize character data');
    }
  },

  getCharacter: (filename) => {
    const character = characters.get(filename.toLowerCase());
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  },

  dealDamage: (filename, damageAmount, damageType) => {
    const character = characterService.getCharacter(filename);
    
    // Check for immunity
    const immunity = character.defenses.find(
      d => d.type === damageType && d.defense === 'immunity'
    );
    if (immunity) {
      return {
        message: `${character.name} is immune to ${damageType} damage`,
        character
      };
    }

    // Check for resistance
    const resistance = character.defenses.find(
      d => d.type === damageType && d.defense === 'resistance'
    );
    let finalDamage = resistance ? Math.floor(damageAmount / 2) : damageAmount;

    // Apply damage to temporary HP first
    if (character.temporaryHp > 0) {
      if (character.temporaryHp >= finalDamage) {
        character.temporaryHp -= finalDamage;
        finalDamage = 0;
      } else {
        finalDamage -= character.temporaryHp;
        character.temporaryHp = 0;
      }
    }

    // Apply remaining damage to current HP
    character.currentHp = Math.max(0, character.currentHp - finalDamage);

    return {
      message: `${character.name} takes ${damageAmount} ${damageType} damage` +
               (resistance ? ' (reduced by resistance)' : ''),
      character
    };
  },

  heal: (filename, amount) => {
    const character = characterService.getCharacter(filename);
    const maxHp = character.hitPoints;
    
    // Cannot heal above max HP
    character.currentHp = Math.min(maxHp, character.currentHp + amount);

    return {
      message: `${character.name} heals for ${amount} HP`,
      character
    };
  },

  addTemporaryHp: (filename, amount) => {
    const character = characterService.getCharacter(filename);
    
    // Temporary HP is not cumulative, take the higher value
    character.temporaryHp = Math.max(character.temporaryHp, amount);

    return {
      message: `${character.name} gains ${amount} temporary HP`,
      character
    };
  }
};

module.exports = characterService;