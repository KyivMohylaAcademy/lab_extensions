import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
    const [message, setMessage] = useState('');

    const logout = () => {
        localStorage.removeItem('publicKey');
        setMessage('Logged out successfully.');
        setTimeout(() => {
            window.location.reload();
        }, 1000); 
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Settings Page</h1>
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded mb-4">
                Logout
            </button>
            {message && (
                <p className="text-sm text-green-500">{message}</p>
            )}
        </div>
    );
};

export default SettingsPage;
