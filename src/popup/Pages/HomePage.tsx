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

    const shortenPublicKey = (key: string) => {
        return `${key.slice(0, 6)}...${key.slice(-6)}`;
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-start p-4">
            <h1 className="text-xl font-bold mb-4">Home Page</h1>
            <div className="flex flex-col items-center mt-8">
                <div className="w-40 h-40 bg-gray-500 rounded-full"></div>
                
                {publicKey && (
                    <>
                        <p className="text-lg font-bold mt-4">Account</p>
                        <p 
                            className="text-sm text-gray-600 underline cursor-pointer"
                            onClick={copyKey}
                        >
                            {shortenPublicKey(publicKey)}
                        </p>
                    </>
                )}

                {balance !== null && (
                    <p className="text-4xl font-bold text-blue-600 mt-4">
                        {balance.toFixed(5)} SOL
                    </p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
