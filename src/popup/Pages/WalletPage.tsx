import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState(localStorage.getItem('publicKey') || '');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (publicKey) {
            setAddress(publicKey);
        }
    }, [publicKey]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    const connectWallet = () => {
        try {
            const key = new PublicKey(publicKey);
            const base58Key = key.toBase58();
            localStorage.setItem('publicKey', base58Key);
            setAddress(base58Key);
            setMessage('Wallet connected successfully!');
        } catch (error) {
            setMessage('Invalid public key. Please enter a valid key.');
        }
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
            <input
                type="text"
                value={publicKey}
                onChange={handleInputChange}
                placeholder="Enter Public Key"
                className="border border-gray-400 p-2 mb-4"
            />
            <button
                onClick={connectWallet}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Connect
            </button>
            {message && (
                <p className={`text-sm ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default WalletPage;
