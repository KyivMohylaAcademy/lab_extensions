import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKeyInput, setPublicKeyInput] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleGenerateAddress = () => {
        try {
            const publicKey = new PublicKey(publicKeyInput.trim());
            const generatedAddress = publicKey.toBase58();
            setAddress(generatedAddress);
            setErrorMessage('');
        } catch (error) {
            console.error('Public key processing error:', error);
            setErrorMessage('Incorrect public key. Please check the entered data.');
            setAddress('');
        }
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
            <input
                type="text"
                value={publicKeyInput}
                onChange={(e) => setPublicKeyInput(e.target.value)}
                placeholder="Enter your public key"
                className="mb-2 p-2 border border-gray-400 rounded w-full max-w-md"
            />
            <button
                onClick={handleGenerateAddress}
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Generate address
            </button>
            {errorMessage && (
                <div className="text-red-500 mb-2">{errorMessage}</div>
            )}
            {address && (
                <div className="text-green-500 break-all max-w-md">
                    Your address: {address}
                </div>
            )}
        </div>
    );
};

export default WalletPage;
