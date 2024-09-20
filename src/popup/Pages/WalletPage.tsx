import React, { useState, useRef } from 'react';
import { PublicKey, Connection, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';


const WalletPage: React.FC = () => {
    const [publicKeyInput, setPublicKeyInput] = useState('');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [selectedAmount, setSelectedAmount] = useState<number>(0);
    const connection = useRef(new Connection(clusterApiUrl("devnet")));

    const handlePublicKeyInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputKey = event.target.value;
        setPublicKeyInput(inputKey);

        if (inputKey === "") {
            setError(null);
            setWalletAddress(null);
            return;
        }

        try {
            const publicKey = new PublicKey(inputKey);
            setWalletAddress(publicKey.toBase58());
            setError(null);

            const balanceInLamports = await connection.current.getBalance(publicKey);
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
            setBalance(balanceInSOL);
        } catch (e) {
            setWalletAddress(null);
            setBalance(0);
            setError('The public key does not exist.');
        }
    };

    const handleAirdropSOLDevnetClick = async () => {
        if (selectedAmount === 0) return;

        try {
            const publicKey = new PublicKey(publicKeyInput);
            const airdropSignature = await connection.current.requestAirdrop(
                publicKey,
                selectedAmount * LAMPORTS_PER_SOL
            ).then((id: string) => {
                console.log(`Transaction ID ${id}`);
            })

            console.log(`Tx Complete: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`)

            setBalance(balance + selectedAmount);

            alert("Success")
        } catch(error) {
            console.error(error)
            alert("Airdrop failed!")
        }
    };

    return (
        <div className=" bg-gray-200 flex flex-col items-center justify-center border border-gray-400">
            <h1 className="text-xl font-bold my-4">Wallet Page</h1>
            <p></p>
            <input
                type="text"
                placeholder="Enter your public key."
                value={publicKeyInput}
                onChange={handlePublicKeyInputChange}
                className="p-2 border border-gray-400 my-4 text-center"
            />

            {walletAddress && (
                <>
                    <div className="text-blue-500 font-semibold w-full my-4">
                        Wallet Address: <br /> <span className='block overflow-x-scroll w-full'>{walletAddress}</span>
                    </div>
                    <div className="font-semibold w-full mb-4">
                        Current Balance (Solana Devnet): <br /> {balance} SOL
                    </div>
                    <div className='my-4'>
                        <label htmlFor="wallet-options" className="mb-2 font-semibold text-blue-700 block">Choose an amount to airdrop to your account (Solana Devnet, max 1 request per hour...):</label>
                        <select
                            id="wallet-options"
                            className="mb-4 p-2 border border-gray-400"
                            value={selectedAmount}
                            onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        >
                            <option value={0} disabled>0 SOL</option>
                            <option value={0.5}>0.5 SOL</option>
                            <option value={1}>1 SOL</option>
                            <option value={2}>2 SOL</option>
                        </select>

                        <button className='bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleAirdropSOLDevnetClick}>
                            Confirm Airdrop
                        </button>
                    </div>
                </>
            )}

            {error && (
                <div className="text-red-600 font-semibold">
                    {error}
                </div>
            )}
        </div>
    );
};

export default WalletPage;