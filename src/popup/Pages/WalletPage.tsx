import React, {useState} from 'react';
import {PublicKey} from '@solana/web3.js';
const WalletPage: React.FC = () => {
    const [publicKeyInput, setPublicKeyInput] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKeyInput(event.target.value);
    };

    const generateAddress = () => {
        try {
            const publicKey = new PublicKey(publicKeyInput);
            setWalletAddress(publicKey.toBase58());
            setError(null);
        } catch (err) {
            setError('Public key is invalid');
            setWalletAddress(null);
        }
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-6">
            <h1 className="text-xl font-bold mb-4">Wallet Page</h1>

            <input
                type="text"
                value={publicKeyInput}
                onChange={handleKeyChange}
                placeholder="Public key..."
                style={{
                    padding: '8px',
                    border: '1px solid #6B7280',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    width: '100%',
                    maxWidth: '280px',
                    outline: 'none',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #7700ae';
                    e.currentTarget.style.borderColor = 'transparent';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#7700ae';
                }}
            />


            <button
                onClick={generateAddress}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}>
                Check key
            </button>


            {error && <p className="text-red-500 mt-4">{error}</p>}
            {walletAddress && (
                <p style={{ color: '#45a049', marginTop: '16px', wordBreak: 'break-all',
                    textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
                    Key is valid: {walletAddress}
                </p>
            )}
        </div>
    );
};

export default WalletPage;
