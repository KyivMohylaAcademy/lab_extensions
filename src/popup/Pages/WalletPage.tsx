import {FC, useState, ChangeEvent} from 'react';
import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const WalletPage: FC = () => {
    const [pubKey, setPubKey] = useState('');

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    const onVerifyButtonClicked = async () => {
        if (!connection)
        {
            alert("No connection!");
            return;
        }

        try
        {
            const publicKey = new PublicKey(pubKey);
            const balanceInLamports = await connection.getBalance(publicKey);
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
            alert(`Valid key.\nAddress: ${publicKey.toBase58()}\nBalance: ${balanceInSOL} SOL`);
        }
        catch (e)
        {
            alert(`Bad key! ${e}`);
            return;
        }
    }

    return (
        <div className=" bg-gray-200 flex flex-col items-center justify-center border border-gray-400">
            <h1 className="text-xl font-bold my-4">Wallet Page</h1>
            <p/>
            <input
                type="text"
                placeholder="Enter the public key."
                value={pubKey}
                onChange={(e) => setPubKey(e.target.value)}
                className="border border-gray-200 my-4 text-center"
            />
            <button
                onClick={onVerifyButtonClicked}
                className="mt-4 my-4 bg-blue-500 text-white py-2 px-4 rounded">
                Verify address
            </button>
        </div>
    );
};

export default WalletPage;
