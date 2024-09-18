import React from 'react';

const SettingsPage: React.FC = () => {
    const logout = () => {
        localStorage.removeItem('publicKey');
        alert('Logged out');
        window.location.reload(); // Reload to update the state
    };

    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center border border-gray-400 p-4">
            <h1 className="text-xl font-bold mb-4">Settings Page</h1>
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
        </div>
    );
};

export default SettingsPage;
