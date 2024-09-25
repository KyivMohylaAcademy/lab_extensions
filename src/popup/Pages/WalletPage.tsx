import React, { useState } from 'react'
import { PublicKey } from '@solana/web3.js'

const WalletPage: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('')
  const [address, setAddress] = useState<string | null>(null)

  const handlePublicKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value)
  }

  const generateAddress = () => {
    try {
      const key = new PublicKey(publicKey)
      setAddress(key.toString())
    } catch (error) {
      alert('Enter a correct public key!')
    }
  }

  return (
    <div>
      <div className="bg-gray-200 flex items-center justify-center border border-gray-400">
        <h1 className="text-xl font-bold">Wallet Page</h1>
      </div>
      <div className="mt-10 flex flex-col justify-cente">
        <input
          id="publicKeyInput"
          type="text"
          value={publicKey}
          onChange={handlePublicKeyChange}
          placeholder="Please, enter your public key..."
          className="border p-2"
        />
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button onClick={generateAddress} className="bg-gray-200 flex items-center justify-center border border-gray-400">
          Generate address!
        </button>
      </div>

      {address && (
        <div className="mt-4">
          <p>Your address is:</p>
          <p className="font-mono" style={{ wordBreak: 'break-all' }}>
            {address}
          </p>
        </div>
      )}
    </div>
  )
}

export default WalletPage