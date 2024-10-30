// pages/index.js
"use client";
import { useState } from 'react';
import { keccak256 } from 'js-sha3';
import { ethers } from 'ethers';
import copy from '../../images/copy.svg';
import etherscan from '../../images/etherscan_logo.svg';
import eth from '../../images/ethereum.svg';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ETHPage = () => {
  const [inputText, setInputText] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  // Función para generar la clave y dirección cada vez que cambia el texto
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    if (text) {
      const hashedOutput = keccak256(text);
      const privateKeyHex = `0x${BigInt(`0x${hashedOutput}`).toString(16).padStart(64, '0')}`;
      setPrivateKey(privateKeyHex);
      const publicKey = generatePublicKey(privateKeyHex);
      setEthAddress(publicKey);
    } else {
      // Limpiar dirección y clave si el campo está vacío
      setEthAddress('');
      setPrivateKey('');
    }
  };

  const generateAddress = () => {
    // Calcular el hash Keccak-256
    const hashedOutput = keccak256(inputText);

    // Generar la clave privada a partir del hash
    const privateKeyHex = `0x${BigInt(`0x${hashedOutput}`).toString(16).padStart(64, '0')}`;
    setPrivateKey(privateKeyHex);

    // Calcular la dirección Ethereum a partir de la clave privada
    const publicKey = generatePublicKey(privateKeyHex);
    setEthAddress(publicKey);
  };

  const generatePublicKey = (privateKeyHex: string) => {
    // Usar ethers.js para generar la dirección Ethereum a partir de la clave privada
    const wallet = new ethers.Wallet(privateKeyHex);
    return wallet.address;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center font-hacker justify-center">
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full max-w-md items-center">
        <div className="flex flex-col items-center mb-6">
          <Image src={eth.src} alt="Ethereum Logo" width={28} height={28} />
          <h1 className="text-3xl font-bold text-gray-800 text-center">Ethereum Wallet Generator</h1>
        </div>
  
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Insert Text:</label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 h-24 focus:ring-blue-500 text-black text-sm"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text here"
          />
        </div>
  
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-1 hover:bg-blue-700 transition w-64 active:scale-95 duration-200"
          onClick={generateAddress}
        >
          GENERATE WALLET
        </button>
  
        <div className="w-full mt-6">
          <div className="flex items-center justify-start mb-2">
            <label className="text-sm font-medium text-gray-700">ETH Address:</label>
            <a
              className="p-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              href={`https://etherscan.io/address/${ethAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={etherscan.src} alt="Etherscan" width={20} height={20} />
            </a>
          </div>
  
          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 text-black"
              readOnly
              value={ethAddress}
            />
            <button
              className="bg-gray-200 py-1 px-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              onClick={() => copyToClipboard(ethAddress)}
            >
              <Image src={copy.src} alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>
  
        <div className="w-full mt-6">
          <div className="flex items-center justify-start mb-2">
            <label className="text-sm font-medium text-gray-700">Private Key:</label>
            <button
              className="p-1 rounded-xl hover:bg-gray-300 transition duration-200 active:scale-90 focus:outline-none"
              onClick={() => setShowPrivateKey(!showPrivateKey)}
            >
              {showPrivateKey ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
            </button>
          </div>
  
          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 text-black"
              readOnly
              value={showPrivateKey ? privateKey : '*'.repeat(privateKey.length)}
            />
            <button
              className="bg-gray-200 py-1 px-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              onClick={() => copyToClipboard(privateKey)}
            >
              <Image src={copy.src} alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>
  
        <div className="flex flex-col items-center mt-3 text-center">
          <p className="text-sm text-gray-600 mb-2">Donate me =)</p>
          <div
            className="flex bg-gray-200 items-center space-x-1 rounded-lg p-1 cursor-pointer transition duration-200"
            onClick={() => copyToClipboard("0x3d90Eb79C1e753Ca51D1447791C07e7CcC219e5C")}
          >
            <span className="text-gray-700 text-xs transition duration-200 active:scale-95">0x3d90Eb79C1e753Ca51D1447791C07e7CcC219e5C</span>
            <button
              className="p-2 rounded-lg transition duration-200 active:scale-90 focus:outline-none"
              aria-label="Copy to clipboard"
            >
              <Image src={copy.src} alt="Copy Icon" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETHPage;
