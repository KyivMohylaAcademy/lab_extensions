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
        <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-12">
            <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Solana Wallet Checker</h1>
                <input
                    type="text"
                    placeholder="Enter Solana Public Key"
                    value={publicKey}
                    onChange={handlePublicKeyChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                        isValid === false ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                    } mb-4`}
                />
                <button
                    onClick={handleCheckKey}
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Validate Public Key
                </button>

                <div className="mt-4 break-words">
                    {isValid === null ? (
                        <p className="text-center text-gray-500">Enter a key to check its validity.</p>
                    ) : isValid ? (
                        <p className="text-center text-green-500 font-medium">
                            Valid Public Key! <br /> Generated Address: <span>{generatedAddress}</span>
                        </p>
                    ) : (
                        <p className="text-center text-red-500 font-medium">Invalid Public Key</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
