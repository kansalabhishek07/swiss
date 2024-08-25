import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export default function App() {
  const { activate, account, library } = useWeb3React();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (account && library) {
      library.getBalance(account).then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
    }
  }, [account, library]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Crypto Wallet Connector</h1>
      {!account ? (
        <button onClick={() => activate(injected)}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
