import React, { useState } from 'react';
import {PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState('');
    const [address, setAddress] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    const connectWallet = () => {
        try {
            const key = new PublicKey(publicKey);
            localStorage.setItem('publicKey', key.toBase58());
            setAddress(key.toBase58());
            alert('Wallet connected!');
        } catch (error) {
            alert('Invalid public key');
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
                className="bg-blue-500 text-white p-2 rounded"
            >
                Connect
            </button>
            {address && <p className="text-lg font-mono mt-4">Connected Address: {address}</p>}
        </div>
    );
};

export default WalletPage;
