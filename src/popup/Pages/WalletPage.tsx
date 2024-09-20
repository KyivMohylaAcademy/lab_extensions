import { PublicKey } from '@solana/web3.js'
import React, { useState } from 'react'

export interface ValidationState {
  valid: boolean
  checked: boolean
}

const WalletPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [validationState, setValidationState] = useState<ValidationState>({
    checked: false,
    valid: false,
  })

  const validateKey = () => {
    try {
      const key = new PublicKey(inputValue)
      const isValid = PublicKey.isOnCurve(key.toBytes())
      setValidationState({ valid: isValid, checked: true })
    } catch (err) {
      setValidationState({ valid: false, checked: true })
    }
  }

  const onInputChange = (value: string) => {
    setInputValue(value)
    setValidationState({ valid: false, checked: false })
  }

  const renderValidation = () => {
    if (!validationState.checked) return null
    return (
      <div className="text-center mt-5">
        <p className="text-xs">{inputValue}</p>
        {validationState.valid ? (
          <p className="text-green-500 font-medium">Cool bra! Your key is VALID!</p>
        ) : (
          <p className="text-red-500 font-medium">Bad bra! Your key is INVALID</p>
        )}
      </div>
    )
  }

  return (
    <>
      <div className=" bg-gray-200 flex items-center justify-center border border-gray-400">
        <h1 className="text-xl font-bold">Wallet Page</h1>
      </div>
      <div className="mt-12">
        <label
          htmlFor="publicKey"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Public Key
        </label>
        <input
          type="text"
          id="publicKey"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="bg-white-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your public key"
        />
        <button
          onClick={validateKey}
          type="button"
          className="mt-2 w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Validate Key
        </button>

        {renderValidation()}
      </div>
    </>
  )
}

export default WalletPage
