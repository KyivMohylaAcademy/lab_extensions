import * as web3js from "@solana/web3.js";
import React, { useState } from 'react';

const HomePage: React.FC = () => {
    const [publicKeyString, setPublicKeyString] = useState('')
    const [walletBalance, setWalletBalance] = useState('')
    const connection = new web3js.Connection(web3js.clusterApiUrl("devnet"));
    const onClick = async () => {
        if (connection == null) {
            alert("Cannot connect to cluster")
            return
        }
        try {
            const publicKey = new web3js.PublicKey(publicKeyString);
            try {
                const balanceInLamports = await connection.getBalance(publicKey);
                const balanceInSOL = balanceInLamports / web3js.LAMPORTS_PER_SOL;
                setWalletBalance("" + balanceInSOL);
            } catch (e) {
                alert("Cannot get balance for '" + publicKeyString + "'");
                return;
            }
        } catch (e) {
            alert("Cannot convert '" + publicKeyString + "' to public key: " + e);
            return;
        }

    };

    return (
        <div>
            <div className="bg-gray-200 items-center justify-center border border-gray-400">
                <h1 className="text-xl font-bold">Home Page</h1>
            </div>
            <div style={{margin: 20}}>
                <input className="w-full" placeholder='Enter public key'
                    onChange={(e) => { setPublicKeyString(e.target.value); console.log(publicKeyString) }}
                ></input>
                <button style={{marginTop: 20}} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={onClick}>Get Balance</button>
            </div>
            <p>Your balance: {walletBalance}</p>
        </div>
    );
};

export default HomePage;
