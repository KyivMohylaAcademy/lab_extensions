import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState('');
    const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);
    const [valid, setValid] = useState<boolean | null>(null);

    const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    const handleValidate = () => {
        try {
            const key = new PublicKey(publicKey);
            setValid(true);
            setGeneratedAddress(key.toBase58());
        } catch (err) {
            setValid(false);
            setGeneratedAddress(null);
        }
    };
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-3">
            <h1 className="text-xl font-bold text-center mb-6">Wallet Page</h1>
            <input
                type="text"
                value={publicKey}
                onChange={handlePublicKeyChange}
                placeholder="Please, enter your public key"
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleValidate}
                className="mb-4 py-2 bg-blue-500 w-full text-white font-bold rounded"
            >
                Validate
            </button>
            {valid !== null && (
                valid ? 
                <p className="text-green-500">Valid public key!</p> : 
                <p className="text-red-500">Invalid public key!</p>
            )}
            {generatedAddress && (
                <p className="break-all"><strong>Address:</strong> {generatedAddress}</p>
            )}
        </div>
    );
};

export default WalletPage;