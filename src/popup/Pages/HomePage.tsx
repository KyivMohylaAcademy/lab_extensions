import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const HomePage: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [publicKey, setPublicKey] = useState(localStorage.getItem('publicKey') || '');

    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey) return;
            try {
                const connection = new Connection("https://api.devnet.solana.com", "confirmed");
                const key = new PublicKey(publicKey);
                const balance = await connection.getBalance(key);
                setBalance(balance / 1e9); // Convert lamports to SOL
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [publicKey]);

    const copyKey = () => {
        navigator.clipboard.writeText(publicKey);
        alert('Public key copied!');
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Home Page</h1>
            {publicKey && (
                <>
                    <p className="text-lg font-mono">Public Key: {publicKey}</p>
                    <button onClick={copyKey} className="bg-gray-500 text-white p-2 rounded mt-2">Copy Key</button>
                    {balance !== null && (
                        <p className="text-lg font-mono mt-2">Balance: {balance} SOL</p>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
