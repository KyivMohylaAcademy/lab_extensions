import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React, { useState } from 'react';

const WalletPage: React.FC = () => {
    let [publicKey, setPublicKey] = useState('')
    const [balance, setBalance] = useState(Number)
    const [address, setAddress] = useState("")

    async function generateWalletAdress() {
        const connection = new Connection(clusterApiUrl("devnet"));
        console.log("Connected")
        try {
            const address = new PublicKey(publicKey)
            const balance = await connection.getBalance(address)/ LAMPORTS_PER_SOL
            setAddress(address.toBase58())
            setBalance(balance)
            console.log(PublicKey.isOnCurve(address))
        } catch (e) {
            console.log(e)
            alert("Public key is incorrect")
        }
    }
    
    return (
        <div>
            <div className="mb-4 bg-gray-200 flex flex-col items-center justify-center border border-gray-400">
            <h1 className="text-xl font-bold">Wallet Page</h1>
            </div>
            <div className="flex flex-col items-center">
                <input 
                type="text" 
                placeholder="Enter public key" 
                className="mb-4 px-3 py-2 border border-gray-300 rounded-md"
                onChange={(event) => {setPublicKey(event.target.value);}}
                />
                <button 
                onClick={generateWalletAdress}
                type="button"
                className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                Check Balance
                </button>
            </div>
            <h2>Your address: {address ? address : "..."}</h2>
            <h2>Your balance: {balance ? `${balance}LA` : "..."}</h2>
        </div>
    );
};

export default WalletPage;
