const fs = require('fs');
const path = require('path');

let characters = new Map();

const characterService = {
  initializeCharacterData: () => {
    // Load character data from JSON files in the data directory
      fs.readdirSync(path.resolve('data'), "utf8").forEach((file) => {
        try { 
          const brivData = (JSON.parse(fs.readFileSync(path.join(path.resolve('data'), file), "utf8")));
          const charactername = path.parse(file.toLowerCase()).name 
          characters.set(charactername, {
            ...brivData,
            currentHp: brivData.hitPoints,
            temporaryHp: 0
          });
        }catch (e) {
          console.error(`Failed to load data from ${file}.\n${e}`); // Would log to a logging service in production
        }
      });
  },

  getCharacter: (charactername) => {
    const character = characters.get(charactername.toLowerCase());
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  },

  dealDamage: (charactername, damageAmount, damageType) => {
    const character = characterService.getCharacter(charactername);
    
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

  heal: (charactername, amount) => {
    if (amount < 0) {
      throw "Can not add negative temporary hit points.";
    }
    const character = characterService.getCharacter(charactername);
    const maxHp = character.hitPoints;
    
    // Cannot heal above max HP
    character.currentHp = Math.min(maxHp, character.currentHp + amount);

    return {
      message: `${character.name} heals for ${amount} HP`,
      character
    };
  },

  addTemporaryHp: (charactername, amount) => {
    const character = characterService.getCharacter(charactername);
    
    // Temporary HP is not cumulative, take the higher value
    character.temporaryHp = Math.max(character.temporaryHp, amount);

    return {
      message: `${character.name} gains ${amount} temporary HP`,
      character
    };
  }
};

module.exports = characterService;