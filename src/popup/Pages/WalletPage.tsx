import React from 'react';
import { PublicKey } from "@solana/web3.js"

const WalletPage: React.FC = () => {
  const [publicKeyInput, setPublicKey] = React.useState<string>('');
  const [walletAddress, setWalletAddress] = React.useState<string>('');

  const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const generateAddress = () => {
    try {
      const publicKey = new PublicKey(publicKeyInput);
      setWalletAddress(publicKey.toBase58());
    } catch (error) {
      alert('Invalid Public Key');
    }
  }

  return (
    <div className=" bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
      <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
      <input
        type="text"
        placeholder="Enter Public Key"
        value={publicKeyInput}
        onChange={handlePublicKeyChange}
        className="border p-2 mb-4"
      />
      <button
        onClick={generateAddress}
        className="bg-blue-500 text-white p-2"
      >
        Generate Wallet Address
      </button>
      {walletAddress && (
        <div className="mt-4 p-4 bg-white border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Generated Address</h2>
          <div className="p-2 bg-gray-100 border border-gray-200">
            <p className="font-mono break-all">{walletAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
