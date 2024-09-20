import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [address, setAddress] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (publicKey === '') {
            setIsValid(false);
            setErrorMessage('Public key cannot be empty');
            setAddress(null);
            return;
        }

        try {
            new PublicKey(publicKey);
            setIsValid(true);
            setErrorMessage('');
        } catch (error) {
            setIsValid(false);
            setErrorMessage('Invalid public key');
            setAddress(null);
        }
    }, [publicKey]);

    const handlePublicKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(event.target.value);
    };

    const generateAddress = () => {
        if (!isValid) {
            setErrorMessage('Cannot generate address: Invalid or empty public key');
            return;
        }

        try {
            const key = new PublicKey(publicKey);
            setAddress(key.toString());
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Unexpected error while generating address');
            setAddress(null);
        }
    };

    return (
        <div className="rounded-2xl p-4 shadow-xl bg-white flex flex-col justify-between gap-2 text-sm text-blue-950">
            <h1 className="text-lg font-semibold mb-6">Wallet Page</h1>

            <label htmlFor="publicKey" className="font-semibold text-sm">
                Public Key
            </label>
            <input
                id="publicKey"
                type="text"
                value={publicKey}
                onChange={handlePublicKeyChange}
                placeholder="Enter public key"
                className={`rounded-md border border-2 p-2 ${isValid ? 'border-green-400' : 'border-red-500'}`}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
            )}
            <button
                onClick={generateAddress}
                className={`bg-blue-950 rounded-md my-4 text-sm font-semibold text-white py-3 w-full ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isValid}
            >
                Generate
            </button>


            {address && (
                <p className="break-all text-gray-400"><strong className='font-semibold text-sm text-blue-950'>Your address:</strong> {address}</p>
            )}
        </div>
    );
};

export default WalletPage;