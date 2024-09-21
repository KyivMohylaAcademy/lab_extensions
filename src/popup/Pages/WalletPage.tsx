import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState('');
    const [generatedAddress, setGeneratedAddress] = useState('');

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    const generateAddress = () => {
        try {
            const key = new PublicKey(publicKey);
            setGeneratedAddress(key.toBase58());
        } catch (error) {
            alert('Incorect public key');
        }
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
            <input
                type="text"
                className="p-2 border border-gray-400 mb-4"
                placeholder="Enter public key"
                value={publicKey}
                onChange={handleKeyChange}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={generateAddress}
            >
                Generate address
            </button>
            {generatedAddress && (
                <div className="mt-4 p-2 border border-gray-400 bg-white">
                    <strong>Generated address:</strong> {generatedAddress}
                </div>
            )}
        </div>
    );
};

export default WalletPage;
