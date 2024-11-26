import React, { useState, useEffect } from "react";
import MempoolApp from "./MempoolApp";

const App = () => {
  const [blockBody, setBlockBody] = useState(""); // Input for adding a new block
  const [blockchain, setBlockchain] = useState([]); // Blockchain data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [fileContent, setFileContent] = useState(""); // Content of the uploaded file
  const [newBlockHeight, setNewBlockHeight] = useState(null); // New block's height
  const API_URL = "http://localhost:8000"; // API Base URL

  // Fetch all blocks in the blockchain
  const fetchBlockchain = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/block`);
      if (!response.ok) throw new Error("Failed to fetch blockchain data");
      const data = await response.json();
      setBlockchain(data); // Set fetched blockchain data
    } catch (error) {
      console.error("Error fetching blockchain:", error);
      setError("Failed to fetch blockchain data. Please try again.");
    }
    setLoading(false);
  };

  // Fetch specific block by ID (e.g., /api/block/1, /api/block/2, etc.)
  const fetchBlockById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/block/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch block ${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching block ${id}:`, error);
      setError(`Error fetching block ${id}: ${error.message}`);
    }
    setLoading(false);
  };

  // Add a new block and fetch all blocks before it
  const handleAddBlock = async () => {
    if (!blockBody && !fileContent) {
      alert("Please enter block data or upload a file!");
      return;
    }

    const bodyToSend = fileContent || blockBody; // Use the file content if uploaded, otherwise use block body

    try {
      const response = await fetch(`${API_URL}/api/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: bodyToSend }),
      });

      if (response.ok) {
        const newBlock = await response.json();
        alert("Block added successfully!");

        // Set the new block's height (ID)
        const newBlockHeight = newBlock.height;
        setNewBlockHeight(newBlockHeight);

        // Fetch all blocks with IDs <= the new block's ID
        fetchBlocksBefore(newBlockHeight);
      } else {
        alert("Failed to add block. Please try again.");
      }
    } catch (error) {
      console.error("Error adding block:", error);
    }
  };

  // Fetch blocks before the newly added block (up to the new block's ID)
  const fetchBlocksBefore = async (newBlockHeight) => {
    setLoading(true);
    setError(null);

    const blocks = [];
    for (let i = 1; i <= newBlockHeight; i++) {
      const block = await fetchBlockById(i); // Fetch block by ID
      if (block) {
        blocks.push(block); // Add fetched block to the array
      }
    }

    setBlockchain(blocks); // Update blockchain state with fetched blocks
    setLoading(false);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result); // Store the content of the file
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  // Fetch blockchain data on component mount
  useEffect(() => {
    fetchBlockchain(); // Fetch all blocks on initial load
  }, []);

  return (
    <div>
      <MempoolApp />
      <h1>Blockchain Notary System</h1>

      {/* Add Block Section */}
      <div className="section">
        <h2>Add a New Block</h2>
        <label>Block Data:</label>
        <input
          type="text"
          value={blockBody}
          onChange={(e) => setBlockBody(e.target.value)}
        />
        <button onClick={handleAddBlock}>Add Block</button>
      </div>

      {/* Upload File Section */}
      <div className="section">
        <h2>Upload a Text File</h2>
        <input type="file" accept=".txt" onChange={handleFileUpload} />
        {fileContent && <p>File content loaded</p>}{" "}
        {/* Display if file is loaded */}
      </div>

      {/* Display Blockchain Data */}
      <div className="section">
        <h2>Blockchain Data</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {blockchain.map((block, index) => (
              <li key={index}>
                <h4>Block #{block.height}</h4>
                <pre>{JSON.stringify(block, null, 2)}</pre>
              </li>
            ))}
          </ul>
          
        )}
      </div>
      <div>
    </div>
    </div>
  );
};

export default App;
