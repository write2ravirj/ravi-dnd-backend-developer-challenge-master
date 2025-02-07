# D&D Character HP Management API

This project is a Node.js-based API for managing Dungeons & Dragons character hit points (HP). It allows you to get character data, deal damage, heal, and add temporary HP.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ravirj/ravi-dnd-backend-developer-challenge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ravi-dnd-backend-developer-challenge
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Server

To start the server, run:
```bash
npm start
```
The server will be running on `http://localhost:3000`.

### API Endpoints

- **Deal Damage**
  ```http
  POST /api/character/:filename/damage
  ```
  Deals damage to the character specified in the file.

- **Heal Character**
  ```http
  POST /api/character/:filename/heal
  ```
  Heals the character specified in the file.

- **Add Temporary HP**
  ```http
  POST /api/character/:filename/temp-hp
  ```
  Adds temporary HP to the character specified in the file.

### Example Usage

To deal damage to a character:
```bash
curl -X POST http://localhost:3000/api/character/briv/damage \
  -H "Content-Type: application/json" \
  -d '{"damageAmount": 14, "damageType": "piercing"}'
  
```

To heal a character:
```bash
curl -X POST http://localhost:3000/api/character/briv/heal -H "Content-Type: application/json" -d '{"heal": 5}'
```

To add temporary HP to a character:
```bash
curl -X POST http://localhost:3000/api/character/briv/temp-hp -H "Content-Type: application/json" -d '{"amount": 8}'
```
