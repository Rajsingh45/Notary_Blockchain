import React, { useState } from "react";

const MempoolApp = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [validationResponse, setValidationResponse] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:8000"; // Replace with your API base URL

  // Function to request validation
  const handleRequestValidation = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/requestValidation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress }),
      });

      if (response.ok) {
        const data = await response.json();
        setValidationResponse(data);
        setError(null);
      } else {
        throw new Error("Failed to request validation");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to request validation. Please try again.");
    }
  };

  // Function to validate the wallet signature
  const handleValidateSignature = async () => {
    if (!walletAddress || !signature) {
      alert("Please enter both wallet address and signature!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/message-signature/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, signature }),
      });

      if (response.ok) {
        const data = await response.json();
        setValidationResponse(data);
        setError(null);
      } else {
        throw new Error("Failed to validate signature");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Signature Verified!");
    }
  };

  return (
    <div>
      <h1>Validation System</h1>

      {/* Wallet Address Input */}
      <div className="section">
        <h2>Request Validation</h2>
        <label>Wallet Address:</label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
        />
        <button onClick={handleRequestValidation}>Request Validation</button>
      </div>

      {/* Signature Validation */}
      <div className="section">
        <h2>Validate Wallet Signature</h2>
        <label>Signature:</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter wallet signature"
        />
        <button onClick={handleValidateSignature}>Validate Signature</button>
      </div>

      {/* Validation Response */}
      <div className="section">
        <h2>Validation Response</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {validationResponse && (
          <pre>{JSON.stringify(validationResponse, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default MempoolApp;
