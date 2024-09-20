import React, { useState } from 'react';
import { Connection, PublicKey,  LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState('');
    const [balance, setBalance] = useState(Number);
    const [address, setAddress] = useState("")
   
    async function getBalanceByKey(){
        const connection = new Connection(clusterApiUrl("devnet"))
        console.log(`Connected!`);
        try{
            const address = new PublicKey(publicKey)
            const balance = await connection.getBalance(address) / LAMPORTS_PER_SOL
            setAddress(address.toBase58())
            setBalance(balance)
        }catch (e){
            console.log(e)
            alert("The public key isn't correct!")
        }
    }
    function removePrevData(){
        setAddress("");
         setBalance(0)
    }

    return (
    <div>
        <div className=" bg-gray-200 flex items-center justify-center border border-gray-400">
            <h1 className="text-xl font-bold">Wallet Page</h1>
        </div>
        <div style={{marginTop: 40 }} >
            <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Input your public key:
            </p>
            <input 
                type="text" 
                id="publicKey"
                className="my-500 w-full p-100 bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Public Key'
                onFocus={removePrevData}
                onChange={(e) => {setPublicKey(e.target.value)}}
            />
        </div>
        <div style={{marginTop: 20 }}>
        
            <button 
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={getBalanceByKey}
            >
                Find Balance
            </button>
        </div>
        <div style={{marginTop: 100 }}>
            <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Your address: {address ? address : "..."}
            </p>
            <p className='block mb-20 text-sm font-medium text-gray-900 dark:text-white'>
                Balance is: {balance ? balance + " SOL" : "..."}
            </p>    
        </div>
    </div>
    );
};

export default WalletPage;
