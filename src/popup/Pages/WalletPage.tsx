import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import './WalletPage.css';

const WalletPage: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string>('');

  const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const validateAndGenerateAddress = () => {
    try {
      const key = new PublicKey(publicKey);
      setIsValid(true);
      setSolanaAddress(key.toBase58()); 
    } catch (error) {
      setIsValid(false);
      setSolanaAddress('');
    }
  };
    return (
        <div>
            <div className=" bg-gray-200 flex items-center justify-center border border-gray-400 mb-5">
            <h1 className="text-xl font-bold ">Wallet Page</h1>
        </div>
      <div>
        <label htmlFor="publicKeyLabel" className="bold-label">Enter Public Key:</label>
        <input
          id="publicKey"
          type="text"
          value={publicKey}
          onChange={handlePublicKeyChange}
        />
        <button className="generate-button" onClick={validateAndGenerateAddress}>Generate Address</button>
      </div>

      {isValid === true && (
        <div className="solana-address">
          <p>Valid public key! Solana Address:</p>
          <p className="solana-address">{solanaAddress}</p>
        </div>
      )}

      {isValid === false && <p>Invalid public key. Please try again.</p>}
    </div>
    );
};

export default WalletPage;
