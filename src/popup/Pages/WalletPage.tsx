import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);

    const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    const handleCheckKey = () => {
        try {
            const pubKey = new PublicKey(publicKey);
            
            if (PublicKey.isOnCurve(pubKey.toBuffer())) {
                setIsValid(true);
                setGeneratedAddress(pubKey.toBase58()); 
            } else {
                setIsValid(false);
                setGeneratedAddress(null);
            }
        } catch (error) {
            setIsValid(false); 
            setGeneratedAddress(null);
        }
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
            <input
                type="text"
                placeholder="Enter Public Key"
                value={publicKey}
                onChange={handlePublicKeyChange}
                className="border border-gray-400 p-2 rounded mb-4 w-full max-w-md"
            />
            <button
                onClick={handleCheckKey}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Check Public Key
            </button>
            <div className="w-full max-w-md break-words">
                {isValid === null ? (
                    <p></p>
                ) : isValid ? (
                    <p className="text-green-500">Valid Public Key. Generated Address: {generatedAddress}</p>
                ) : (
                    <p className="text-red-500">Invalid Public Key</p>
                )}
            </div>
        </div>
    );
};

export default WalletPage;
