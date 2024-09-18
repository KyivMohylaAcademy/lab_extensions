import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKeyInput, setPublicKeyInput] = useState('');
    const [isValidKey, setIsValidKey] = useState(true);
    const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);

    const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKeyInput(e.target.value);
    };

    const handleVerifyClick = () => {
        try {
            const pubKey = new PublicKey(publicKeyInput);
            setIsValidKey(true);
            setGeneratedAddress(pubKey.toBase58());
        } catch (err) {
            setIsValidKey(false);
            setGeneratedAddress(null);
        }
    };

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
            {isValidKey && generatedAddress && (
                <div className="overflow-x-auto">
                    <p className="text-green-500">Valid Public Key!</p>
                    <p className="text-gray-700 break-all">Generated Address: {generatedAddress}</p>
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