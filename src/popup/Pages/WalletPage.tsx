import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [publicKey, setPublicKey] = useState<string>('');

    const network = 'https://api.devnet.solana.com';
    const connection = new Connection(network);

    const fetchBalance = async () => {
        try {
            const key = new PublicKey(publicKey);
            const balanceLamports = await connection.getBalance(key);
            const balanceSol = balanceLamports / 1e9;
            setBalance(balanceSol);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4 h-92">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>
            
            <input
                type="text"
                placeholder="Enter Public Key"
                value={publicKey}
                onChange={handleInputChange}
                className="border p-2 rounded mb-4"
            />
            
            <button
                onClick={fetchBalance}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Check Balance
            </button>

            {balance !== null && (
                <div className="mt-4">
                    <h3>Balance: {balance} SOL</h3>
                </div>
            )}
        </div>
    );
};

export default WalletPage;
