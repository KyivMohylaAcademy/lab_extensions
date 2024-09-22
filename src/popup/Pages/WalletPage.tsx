import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

const WalletPage = () => {
    const [userKey, setUserKey] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [solanaAddress, setSolanaAddress] = useState('');

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserKey(event.target.value);
    };

    const processPublicKey = () => {
        try {
            const key = new PublicKey(userKey.trim());
            const isValidKey = PublicKey.isOnCurve(key.toBuffer());

            if (isValidKey) {
                setSolanaAddress(key.toBase58());
                setFeedbackMessage('Public key is valid.');
            } else {
                setFeedbackMessage('This key is not on the curve.');
                setSolanaAddress('');
            }
        } catch (error) {
            setFeedbackMessage('Invalid input. Make sure you enter a correct public key.');
            setSolanaAddress('');
        }
    };

    return (
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h3>Solana Wallet Key Validator</h3>
            <input
                type="text"
                value={userKey}
                onChange={handleKeyChange}
                placeholder="Enter your Solana public key"
                style={{ padding: '8px', width: '90%', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
            <div>
                <button
                    onClick={processPublicKey}
                    style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Validate Key
                </button>
            </div>

            {feedbackMessage && (
                <p style={{ color: feedbackMessage.includes('Invalid') || feedbackMessage.includes('not on the curve') ? 'red' : 'green', marginTop: '10px' }}>
                    {feedbackMessage}
                </p>
            )}

            {solanaAddress && (
                <p style={{ marginTop: '10px', wordBreak: 'break-word', color: '#000' }}>
                    Generated Address: <strong>{solanaAddress}</strong>
                </p>
            )}
        </div>
    );
};

export default WalletPage;
