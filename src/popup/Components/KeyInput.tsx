// components/WalletInput.tsx
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const KeyInput = () => {
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  const handleGetBalance = async () => {
    try {
      const key = new PublicKey(publicKey);
      const balance = await connection.getBalance(key) / 1e9;
      setBalance(balance);
      setError(null);
    } catch (err) {
      setError('Invalid public key');
      setBalance(null);
    }
  };

  return (
  <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-md text-center">
    <input
      type="text"
      value={publicKey}
      onChange={handleKeyChange}
      placeholder="Enter public key"
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleGetBalance}
      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Get balance
    </button>

    {balance && (
      <div className="mt-6">
        <h4 className="font-semibold"></h4>
        <p className="mt-2 text-gray-600 break-words w-full max-w-xs mx-auto overflow-hidden">
          Balance is {balance} SOL.
        </p>
      </div>
    )}

    {error && (
      <div className="mt-4 text-red-500">
        <p>{error}</p>
      </div>
    )}
  </div>

  );
};

export default KeyInput;
