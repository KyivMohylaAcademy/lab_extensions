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
      alert('Invalid public key')
    }
  }

  return (
    <div>
      <div className=" bg-gray-200 flex items-center justify-center border border-gray-400">
        <h1 className="text-xl font-bold">Wallet Page</h1>
      </div>
      {/* <div className="mt-10 flex flex-col items-center justify-center"> */}
      <div className="mt-10 flex flex-col justify-cente">
        <label
          htmlFor="publicKeyInput"
          className="text-gray-700 font-bold mb-1 text-left"
        >
          Public Key:
        </label>
        <input
          id="publicKeyInput"
          type="text"
          value={publicKey}
          onChange={handlePublicKeyChange}
          placeholder="Enter public key"
          className="border p-2"
        />
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button onClick={generateAddress} className="bg-blue-500 text-white px-4 py-2">
          Generate Address
        </button>
      </div>

      {address && (
        <div className="mt-4">
          <p>Your address:</p>
          <p className="font-mono" style={{ wordBreak: 'break-all' }}>
            {address}
          </p>
        </div>
      )}
    </div>
  )
}

export default WalletPage
