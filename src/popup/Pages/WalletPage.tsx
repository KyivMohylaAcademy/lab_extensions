import React, { useState } from 'react'
import { PublicKey } from '@solana/web3.js'

const WalletPage: React.FC = () => {
    const [pubKeyInput, setPublicKey] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [isValidKey, setValidKey] = useState<boolean>(false);

    const generateAdress = () => {
        try {
            const pubKey = new PublicKey(pubKeyInput); // validation of pub key
            setAddress(pubKey.toString()); // setting address
            setValidKey(true);
        } catch (err){
            setValidKey(false);
            alert('Incorrect public key.');
        }
    }

    return (
      <div className="p-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold">Wallet Page</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="">Private key</h2>
          <input type="text" value={pubKeyInput} onChange={e => setPublicKey(e.target.value)} />
          <button className="justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 pl-5 pr-5 pt-3 pb-3" onClick={generateAdress}>Submit</button>
          {isValidKey && (
            <div className="mt-5 items-center">
              <h3 className="text-green-500">Valid Address:</h3>
              <p className="break-all">{address}</p>
            </div>
          )}
        </div>
      </div>
    );
};

export default WalletPage;
