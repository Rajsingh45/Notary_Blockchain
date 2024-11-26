<!DOCTYPE html>
<html lang="en">
<body>
    <header>
        <h1>Notary Blockchain Web Service</h1>
        <p>
            This repository contains a blockchain-based notary service that allows users to register stars on the blockchain.
            The application provides features like address validation, message signing, and storing star data.
        </p>
    </header>
    <section>
        <h2>Getting Started</h2>
        <p>These instructions will help you set up the project on your local machine for development and testing purposes.</p>
    </section>
    <section>
        <h2>Prerequisites and Installation</h2>
        <ol>
            <li>
                <strong>Install Node.js:</strong>
                <p>Download and install Node.js from <a href="https://nodejs.org/en/">Node.js Official Website</a>.</p>
            </li>
            <li>
                <strong>Clone or Download Repository:</strong>
                <pre class="code-block">
git clone https://github.com/Rajsingh45/Notary_Blockchain.git
cd Notary_Blockchain
                </pre>
            </li>
            <li>
                <strong>Initialize Node.js Project:</strong>
                <pre class="code-block">npm init -y</pre>
            </li>
            <li>
                <strong>Install Dependencies:</strong>
                <pre class="code-block">
npm install crypto-js@3.1.9-1 --save
npm install level@5.0.1 --save
npm install express@4.16.4 --save
npm install body-parser@1.18.3 --save
npm install bitcoinjs-message@2.0.0 --save
npm install bitcoinjs-lib@4.0.3 --save
npm install hex2ascii@0.0.3 --save
                </pre>
            </li>
        </ol>
    </section>
    <section>
        <h2>Running and Testing the Application</h2>
        <ol>
            <li>
                <strong>Start the Application:</strong>
                <pre class="code-block">node app.js</pre>
                <p>The server will start on <a href="http://localhost:8000">http://localhost:8000</a>. The application initializes a blockchain with a Genesis Block and 9 Test Blocks (data persists in LevelDB).</p>
            </li>
            <li>
                <strong>Test Basic GET and POST Endpoints:</strong>
                <ul>
                    <li>
                        <strong>Add a New Block:</strong>
                        <pre class="code-block">
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"body":"Test Block"}' \
     http://localhost:8000/api/block
                        </pre>
                    </li>
                    <li>
                        <strong>Retrieve a Block by Height:</strong>
                        <pre class="code-block">curl http://localhost:8000/api/block/1</pre>
                    </li>
                </ul>
            </li>
            <li>
                <strong>Test Validation and Star Registry:</strong>
                <ul>
                    <li>
                        <strong>Submit Address Validation Request:</strong>
                        <pre class="code-block">
curl -X POST http://localhost:8000/requestValidation \
-H 'Content-Type: application/json' \
-d '{"address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"}'
                        </pre>
                    </li>
                    <li>
                        <strong>Sign and Validate the Message:</strong>
                        <pre class="code-block">
curl -X POST http://localhost:8000/message-signature/validate \
-H 'Content-Type: application/json' \
-d '{
    "address":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
}'
                        </pre>
                    </li>
                    <li>
                        <strong>Store Star Data:</strong>
                        <pre class="code-block">
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
                        </pre>
                    </li>
                </ul>
            </li>
        </ol>
    </section>
    <section>
        <h2>Built With</h2>
        <ul>
            <li><a href="https://nodejs.org/en/">Node.js</a> - JavaScript runtime environment</li>
            <li><a href="https://expressjs.com/">Express.js</a> - Web API framework</li>
            <li><a href="https://github.com/google/leveldb">LevelDB</a> - Local database for blockchain persistence</li>
            <li>Electrum Wallet - Used for generating signatures</li>
            <li>Postman - API testing tool</li>
            <li>MS Visual Studio Code - Code editor</li>
        </ul>
    </section>
    <footer>
        <h3>Author</h3>
        <p><strong>Raj Singh</strong></p>
    </footer>
</body>
</html>
