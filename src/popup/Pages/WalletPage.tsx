import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const generateAddress = () => {
    try {
      const pubKey = new PublicKey(publicKey);
      setAddress(pubKey.toBase58());
      setError('');
    } catch (err) {
      setError('Invalid public key');
      setAddress('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Wallet Page</h1>
      <div className="mb-4">
        <input
          type="text"
          value={publicKey}
          onChange={handleInputChange}
          placeholder="Enter public key"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateAddress}
        className="w-full bg-blue-500 text-white p-2"
      >
        Generate
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {address && (
        <div className="mt-4">
          <h2 className="text-lg">Generated Address:</h2>
          <p className="break-all bg-white p-2">{address}</p>
        </div>
      )}
    </div>
  );
};

export default WalletPage;