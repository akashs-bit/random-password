import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.css"; // Import the custom CSS file

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedChar, setAllowedChar] = useState(false);
  const [copyStatus, setCopyStatus] = useState(""); // State for showing "Copied!" message
  const passwordRef = useRef(null); // Ref for the password display element

  /**
   * Function to generate the password.
   */
  const generatePassword = useCallback(() => {
    let generatedPassword = "";
    let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowedNumber) charSet += "0123456789";
    if (allowedChar) charSet += "!@#$%&*()";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, allowedChar, allowedNumber]);

  /**
   * Use `useEffect` to trigger password generation when dependencies change.
   */
  useEffect(() => {
    generatePassword();
  }, [length,allowedChar,allowedNumber,generatePassword]);

  /**
   * Function to copy password to clipboard using `useRef`.
   */
  const copyToClipboard = () => {
    if (passwordRef.current) {
      const text = passwordRef.current.textContent; // Get the text content of the referenced element
      navigator.clipboard.writeText(text).then(() => {
        setCopyStatus("Copied!"); // Show "Copied!" in the input box
        setTimeout(() => setCopyStatus(""), 1500); // Clear the message after 2 seconds
      }); 
    }
  };

  return (
    <div className="password-generator">
      <h1 className="password-generator-title">Random Password Generator</h1>

      <div className="form-group">
        <label>Password Length: {length}</label>
        <input
          type="range"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min={8}
          max={20}
          className="slider"
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={allowedNumber}
            onChange={(e) => setAllowedNumber(e.target.checked)}
            className="checkbox"
          />
          Include Numbers
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={allowedChar}
            onChange={(e) => setAllowedChar(e.target.checked)}
            className="checkbox"
          />
          Include Symbols
        </label>
      </div>

      <div ref={passwordRef} className="password-display">
        <p></p>
        <strong>{password}</strong>
      </div>

      <button onClick={copyToClipboard} className="copy-button">
        Copy
      </button>

      {copyStatus && (
        <div className="copied-status">
          <input type="text" readOnly value={copyStatus} className="copied-input" />
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
