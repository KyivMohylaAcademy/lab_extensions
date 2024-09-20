import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value;
        setPublicKey(key);
    };

    const generateAddress = () => {
        try {
            const pubKey = new PublicKey(publicKey);
            setAddress(pubKey.toBase58());
            setError(null);
        } catch (err) {
            setError('Invalid public key!');
            setAddress(null);
        }
    };

    return (
        <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Wallet Page</h1>
      <div className="mb-4">
        <input
          type="text"
          value={publicKey}
          onChange={handleKeyChange }
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
