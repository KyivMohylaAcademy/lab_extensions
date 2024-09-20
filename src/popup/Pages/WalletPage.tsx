import React, { useState } from 'react'
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'
import solanaLogo from '../../solanaLogoMark.svg'
const WalletPage = () => {
  const [enteredPublicKey, setEnteredPublicKey] = useState('')
  const [cryptoAddress, setCryptoAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

  const handleConnectWallet = async () => {
    if (!connection) {
      alert('No connection to solana cluster!')
      return
    }

    try {
      const pbKey = new PublicKey(enteredPublicKey)

      try {
        const balanceInLamp = await connection.getBalance(pbKey)
        const solBalance = balanceInLamp / LAMPORTS_PER_SOL
        setCryptoAddress(pbKey.toBase58())
        setBalance(`${solBalance} SOL`)
      } catch (error) {
        alert('Cannot get balance for entered public key!')
        console.log(error)
      }
    } catch (error) {
      alert('Wrong public key!')
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center p-2">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-[#232323]">Solana Wallet</h1>
        <input
          type="text"
          placeholder="Enter public key"
          value={enteredPublicKey}
          onChange={(e) => setEnteredPublicKey(e.target.value)}
          className="mt-4 w-full p-2 rounded border border-[#c0c0c0] bg-[#c0c0c0] text-black focus:outline-none focus:ring-2 focus:ring-[#00ffbd]"
        />
        <button
          onClick={handleConnectWallet}
          className="mt-4 w-full py-2 bg-[#00ffbd] text-[#232323] font-bold rounded hover:bg-[#00ffbd]/90 focus:outline-none focus:ring-4 focus:ring-[#00ffbd]/50"
        >
          Connect
        </button>

        {cryptoAddress && (
          <div className="mt-6 text-left ">
            <img src={solanaLogo} alt="Solana Logo" className="w-16 mx-auto mb-2" />
            <p className="text-[#232323] break-all max-w-full">{`Public key: ${cryptoAddress}`}</p>
            {balance !== null && (
              <p className="text-[#232323] break-all max-w-full">{`Balance: ${balance}`}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletPage
