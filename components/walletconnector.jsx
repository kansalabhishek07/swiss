import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnector = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div className="wallet-connector">
      <h1>Connect Your Ethereum Wallet</h1>
      {!account ? (
        <button className="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
