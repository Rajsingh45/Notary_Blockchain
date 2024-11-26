
Notary Blockchain Web Service
This repository contains a blockchain-based notary service that allows users to register stars on the blockchain. The application provides features like address validation, message signing, and storing star data.

Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

Prerequisites and Installation
Install Node.js
Download and install Node.js from Node.js Official Website.

Clone or Download Repository
Clone the GitHub repository to your desired directory:

bash
Copy code
git clone https://github.com/Rajsingh45/Notary_Blockchain.git
cd Notary_Blockchain
Initialize Node.js Project
Navigate to the project directory and initialize the Node.js project:

bash
Copy code
npm init -y
Install Dependencies
Install the required dependencies:

bash
Copy code
npm install crypto-js level express body-parser bitcoinjs-message bitcoinjs-lib hex2ascii --save
Running and Testing the Application
Start the Application
Run the following command from the project directory to start the server:

bash
Copy code
node app.js
The server will start on http://localhost:8000. The application initializes a blockchain with a Genesis Block and 9 Test Blocks (data persists in LevelDB).

Test Basic GET and POST Endpoints

Add a New Block
POST request example:

bash
Copy code
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"body":"Test Block"}' \
     http://localhost:8000/api/block
This adds a new block to the blockchain and returns the block details.

Retrieve a Block by Height
GET request example:

bash
Copy code
curl http://localhost:8000/api/block/1
Test Validation and Star Registry

Submit Address Validation Request

bash
Copy code
curl -X POST http://localhost:8000/requestValidation \
-H 'Content-Type: application/json' \
-d '{"address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"}'
The response includes a message to be validated:

json
Copy code
{
  "walletAddress": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
  "requestTimeStamp": "1541605128",
  "message": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL:1541605128:starRegistry",
  "validationWindow": 300
}
Sign and Validate the Message
Use your Electrum wallet to sign the message and submit it:

bash
Copy code
curl -X POST http://localhost:8000/message-signature/validate \
-H 'Content-Type: application/json' \
-d '{
    "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
}'
Store Star Data
Submit star data to the blockchain:

bash
Copy code
curl -X POST http://localhost:8000/message-signature/validate \
-H 'Content-Type: application/json' \
-d '{
    "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "star": {
        "dec": "68° 52' 56.9",
        "ra": "16h 29m 1.0s",
        "story": "Found star using https://www.google.com/sky/"
    }
}'
Additional Functionality

Retrieve a block by its hash:
bash
Copy code
curl http://localhost:8000/stars/hash/<block_hash>
Retrieve all star blocks associated with a wallet address:
bash
Copy code
curl http://localhost:8000/stars/address/<wallet_address>
Retrieve a block by height:
bash
Copy code
curl http://localhost:8000/block/<block_height>
Built With
Node.js - JavaScript runtime environment
Express.js - Web API framework
LevelDB - Local database for blockchain persistence
Electrum Wallet - Used for generating signatures
Postman - API testing tool
MS Visual Studio Code - Code editor
Author
Raj Singh

