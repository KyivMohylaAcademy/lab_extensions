import React, { useState, useEffect } from 'react';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
  const [publicKeyInput, setPublicKeyInput] = useState('');
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isValidKey, setIsValidKey] = useState(true);

  const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPublicKeyInput(input);
    setIsValidKey(true);
    setPublicKey(null);
    setBalance(null);
  };

  const handleVerifyClick = () => {
    try {
      const key = new PublicKey(publicKeyInput);
      setPublicKey(key);
      setIsValidKey(true);
    } catch {
      setIsValidKey(false);
      setPublicKey(null);
      setBalance(null);
    }
  };

  useEffect(() => {
    if (publicKey) {
      const fetchBalance = async () => {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balanceLamports = await connection.getBalance(publicKey);
        setBalance(balanceLamports / LAMPORTS_PER_SOL);
      };
      fetchBalance();
    }
  }, [publicKey]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Wallet Page</h1>
      <input
        type="text"
        value={publicKeyInput}
        onChange={handlePublicKeyChange}
        placeholder="Enter your public key"
        className="border-2 p-2 w-full mb-4"
      />
      {!isValidKey && <p className="text-red-500">Invalid public key</p>}
      {isValidKey && publicKey && (
        <div className="overflow-x-auto">
          <p className="text-green-500">Valid Public Key!</p>
          <p className="text-gray-700 break-all">Generated Address: {publicKey.toBase58()}</p>
          {balance !== null ? (
            <p className="text-gray-700 break-all">Account balance: {balance} SOL</p>
          ) : (
            <p className="text-gray-700">Loading balance...</p>
          )}
        </div>
      )}
      <button
        onClick={handleVerifyClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Verify Key
      </button>
    </div>
  );
};

export default WalletPage;