import React from 'react';
import KeyInput from '../Components/KeyInput';
const WalletPage: React.FC = () => {
    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <KeyInput></KeyInput>
        </div>
    );
};

export default WalletPage;
